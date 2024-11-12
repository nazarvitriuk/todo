<script setup>
import { object, string } from 'yup'
import {useTodosStore} from "~/store/todos.js";
import { todoCompletionStatuses, todoPriorityStatuses } from "~/config/statuses.js";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  priority: {
    type: String,
    default: 'Medium'
  },
  status: {
    type: String,
    default: ''
  },
  favorite: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close']);

const todoStore = useTodosStore();

const schema = object({
  title: string().required('This field is required'),
  description: string().required('This field is required')
})

const state = reactive({
  title: props.title,
  description: props.description,
  files: 0,
})

const priority = ref(props.priority);

function onSubmit(event) {

  if (props.isEdit && props.id) {
    todoStore.editTodo(props.id, {
      ...event.data,
      id: props.id,
      priority: priority.value,
      status: props.status,
      created_at: new Date().toLocaleString(),
      is_favorite: props.favorite
    })
  }

  if (!props.isEdit) {
    todoStore.addTodo({
      ...event.data,
      id: new Date().toLocaleString().replace(/[^a-zA-Z0-9]/g, ''), // generate unique id
      priority: priority.value,
      created_at: new Date().toLocaleString(),
      status: todoCompletionStatuses[1],
      is_favorite: false
    });
  }

  todoStore.fetchTodos();
  emits('close');
}

function addFile() {
  if (state.files < 3) state.files++;
}

</script>

<template>
  <UModal>
    <div class="todo-modal">
      <div class="todo-modal__header rounded-b-lg bg-black py-3 text-white">
        <h3 class="text-2xl text-center font-bold">
          {{ isEdit ? 'Edit Task' : 'Create Task' }}
        </h3>
      </div>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <div class="p-5 flex flex-col gap-5">

          <UFormGroup label="Title" name="title">
            <UInput :autofocus="false" v-model="state.title" class="bg-white" />
          </UFormGroup>

          <div class="flex justify-between">
            <USelect
              v-model="priority"
              :options="todoPriorityStatuses"
            />
          </div>

          <UFormGroup label="Description" name="description">
            <UTextarea v-model="state.description" placeholder="Description" class="bg-white" />
          </UFormGroup>

          <div class="flex gap-3">
            <div
              v-for="file in state.files"
              :key="`file${file}`"
              class="h-[140px] max-w-[33%] flex justify-center items-center flex-1 border-2 border-dashed border-sky-400 cursor-pointer"
            >
              <UIcon name="i-heroicons-solid:document-check" class="text-4xl text-sky-400" />
            </div>

            <div
              v-if="state.files < 3"
              class="h-[140px] max-w-[33%] flex justify-center items-center flex-1 border-2 border-dashed border-sky-200 cursor-pointer"
              @click="addFile"
            >
              <UIcon name="i-heroicons-solid:document-add" class="text-4xl text-sky-200" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-6 rounded-b-lg bg-black py-3 text-white">
          <UButton color="black" variant="solid" class="px-6 py-2" @click.prevent="emits('close')">
            Cancel
          </UButton>
          <UButton type="submit" class="px-6 py-2">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </UModal>
</template>

<style scoped>
.todo-modal {
  background-color: var(--app-light);
}
</style>
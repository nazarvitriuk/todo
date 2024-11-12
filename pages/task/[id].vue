<script setup>

import {todoCompletionStatuses, todoPriorityStatusesStyles} from "~/config/statuses";
import {useTodosStore} from "~/store/todos";
import {onMounted} from "vue";
import ToDoModal from "~/components/ToDoModal.vue";

const route = useRoute();
const router = useRouter();
const modal = useModal();
const todosStore = useTodosStore();
const todo = ref();

function onEdit() {
  modal.open(ToDoModal, {
    id: todo.value.id,
    title: todo.value.title,
    description: todo.value.description,
    priority: todo.value.priority,
    favorite: todo.value.is_favorite,
    isEdit: true,
    status: todo.value.status,
    onClose() {
      modal.close();
      getTodoData();
    }
  })
}

function onDelete() {
  todosStore.deleteTodo(todo.value.id);
  router.push('/');
}

function getTodoData() {
  todosStore.fetchTodos();
  todo.value = todosStore.todos.find(t => t.id === route.params.id);
}

onMounted(() => {
  getTodoData();
})
</script>

<template>
  <div v-if="todo" class="px-2">
    <div class="container mx-auto bg-white rounded-[8px] p-3 flex flex-col gap-5">
      <div class="flex flex-col lg:flex-row justify-between">

        <div class="flex items-center gap-2">
          <UButton size="xl" icon="i-heroicons-solid-star" variant="ghost" color="orange" />
          <h3 class="text-2xl font-bold">
            {{ todo.title }}
          </h3>
        </div>

        <div class="flex items-center gap-2">
          <USelect
            v-model="todo.status"
            class="flex-1 :md-flex-auto"
            :options="todoCompletionStatuses"
            option-attribute="name"
            disabled
          />
          <UButton size="xl" icon="i-heroicons-pencil" variant="ghost" @click="onEdit" />
          <UButton size="xl" icon="i-heroicons-trash" variant="ghost" @click="onDelete" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-5">
        <div class="flex items-center gap-2">
          <UIcon
            class="text-2xl"
            :name="todoPriorityStatusesStyles[todo.priority].icon"
            :style="{ 'color': todoPriorityStatusesStyles[todo.priority].color }"
          />
          <span class="text-sm text-gray-900">{{ todo.priority }}</span>
        </div>

        <span class="text-teal-900">ID: {{ todo.id }}</span>
        <span class="text-teal-900">{{ todo.created_at }}</span>
      </div>

      <p class="max-w-[683px] text-teal-900">
        {{ todo.description }}
      </p>

      <div class="flex max-w-[445px] gap-4">
        <div
          v-for="file in todo.files"
          :key="`file${file}`"
          class="h-[100px] lg:h-[140px] max-w-[33%] flex justify-center items-center flex-1 bg-sky-200 cursor-pointer"
        >
          <UIcon name="i-heroicons-solid:document-check" class="text-4xl text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
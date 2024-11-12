<script setup>

import {todoCompletionStatuses, todoCompletionStatusesStyles, todoPriorityStatusesStyles} from "~/config/statuses";
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
    <div class="container mx-auto bg-white rounded-[8px] flex flex-col lg:flex-row justify-between p-6 gap-3">
      <div class="flex flex-col gap-3 lg:gap-5">
        <div class="flex flex-col lg:flex-row">
          <div class="flex items-center gap-2">
            <UIcon size="xl" class="text-2xl" name="i-heroicons-solid-star" />
            <h3 class="text-2xl font-bold">
              {{ todo.title }}
            </h3>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-5 lg:pl-8">
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

        <p class="max-w-[683px] text-teal-900 lg:pl-8">
          {{ todo.description }}
        </p>

        <div class="flex max-w-[445px] gap-4 lg:pl-8">
          <div
            v-for="file in todo.files"
            :key="`file${file}`"
            class="h-[100px] lg:h-[120px] max-w-[33%] flex justify-center items-center flex-1 bg-sky-200 cursor-pointer"
          >
            <UIcon name="i-heroicons-solid:document-check" class="text-4xl text-white" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 lg:gap-10">
        <div class="flex items-center gap-2">
          <USelectMenu
            v-model="todo.status"
            class="flex-1 md:flex-auto min-w-[160px]"
            :options="todoCompletionStatuses"
            option-attribute="name"
            disabled
          >
            <template #leading>
              <div class="rounded-r-lg w-[4px] h-[22px] mr-1" :style="{ 'background': todoCompletionStatusesStyles[todo.status].color }"></div>
            </template>

            <template #option="{ option: option }">
              <div class="rounded-r-lg w-[4px] h-[22px] mr-1" :style="{ 'background': todoCompletionStatusesStyles[option].color }"></div>
              {{ option }}
            </template>
          </USelectMenu>

          <UButton size="sm" icon="i-heroicons-pencil" color="white" @click="onEdit" />
          <UButton size="sm" icon="i-heroicons-trash" color="white" @click="onDelete" />
        </div>

        <div class="flex flex-col gap-5 bg-sky-50 border-2 border-sky-200 p-3 rounded-lg w-[304px]">
          <div class="flex gap-3">
            <USkeleton class="h-12 w-12 bg-sky-200 shrink-0" :ui="{ rounded: 'rounded-full' }" />
            <div class="flex flex-col gap-3 flex-1">
              <USkeleton class="h-4 bg-sky-200" />
              <USkeleton class="h-4 bg-sky-200" />
            </div>
          </div>
          <div class="flex gap-3 flex-col">
            <USkeleton class="h-4 bg-sky-200" />
            <USkeleton class="h-4 bg-sky-200" />
          </div>
          <div class="flex gap-3 flex-col">
            <USkeleton class="h-4 bg-sky-200" />
            <USkeleton class="h-4 bg-sky-200" />
          </div>
          <div class="flex gap-3 flex-col">
            <USkeleton class="h-4 bg-sky-200" />
            <USkeleton class="h-4 bg-sky-200" />
          </div>
          <div class="flex gap-3 flex-col">
            <USkeleton class="h-4 bg-sky-200" />
            <USkeleton class="h-4 bg-sky-200" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
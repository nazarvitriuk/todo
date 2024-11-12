<script setup>

import ToDoCard from "~/components/ToDoCard.vue";
import {useTodosStore} from "~/store/todos.js";
import ToDoModal from "~/components/ToDoModal.vue";
import {computed, onMounted} from "vue";

const todosStore = useTodosStore();
const modal = useModal();

const items = [
  {
    label: 'Tasks'
  },
  {
    label: 'Favorites',
  },
  {
    label: 'Completed'
  },
  {
    label: 'History'
  }
]

const filter = ref(items[0].label);

function onChange(v) {
  filter.value = items[v].label;
}

function openEditModal(item) {
  modal.open(ToDoModal, {
    id: item.id,
    title: item.title,
    description: item.description,
    priority: item.priority,
    favorite: item.is_favorite,
    isEdit: true,
    status: item.status,
    onClose() {
      modal.close();
    }
  })
}

const list = computed(() => {

  if (todosStore.search) {
    return todosStore.todos.filter(t => t.title.toLowerCase().includes(todosStore.search.toLowerCase()))
  }

  if (filter.value === 'Favorites') {
    return todosStore.todos.filter(t => t.is_favorite);
  }

  if (filter.value === 'Completed') {
    return todosStore.todos.filter(t => t.status === 'Completed');
  }

  if (filter.value === 'History') {
    return JSON.parse(localStorage.getItem('todos_history'));
  }

  return todosStore.todos;

})

onMounted(() => {
  todosStore.fetchTodos();
})

</script>

<template>
  <div class="container mx-auto p-2">

    <UTabs
      :items="items"
      :ui="{ list: { padding: 'p-2', height: 'h-auto' } }"
      @change="onChange"
    />

    <div v-if="list?.length" class="todos mt-[24px] p-4 bg-white rounded-[8px] flex flex-col gap-3">
      <ToDoCard
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :description="item.description"
        :created-at="item.created_at"
        :priority="item.priority"
        :is-favorite="item.is_favorite"
        :status="item.status"
        :display-only="filter === 'History'"
        @edit="openEditModal(item)"
        @delete="todosStore.deleteTodo(item.id)"
        @status-change="todosStore.changeTodoStatus(item.id, $event)"
        @favorite-change="todosStore.favoriteChange(item.id)"
      />
    </div>

    <UAlert
      v-else
      description="The to-do list is currently empty, but you can add new tasks at any time."
      title="Heads up!"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
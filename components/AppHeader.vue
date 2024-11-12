<script setup>
import ToDoModal from "~/components/ToDoModal.vue";
import {useTodosStore} from "~/store/todos";

const modal = useModal();
const todosStore = useTodosStore();
const route = useRoute();

function openModal() {
  modal.open(ToDoModal, {
    onClose() {
      modal.close();
    }
  })
}

</script>

<template>
  <header class="header fixed w-full z-10">
    <div class="container mx-auto text-white h-full flex flex-col md:flex-row p-2 gap-3 md:items-center justify-between">
      <nuxt-link to="/">
        <img src="/icons/logo.svg" alt="logo" />
      </nuxt-link>
      <UInput
        v-if="route.path === '/'"
        v-model="todosStore.search"
        class="header__search w-full max-w-[550px]"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search"
      />
      <UButton color="blue" variant="solid" class="px-10 flex justify-center max-w-[550px]" @click="openModal">
        Add Task
      </UButton>
    </div>
  </header>
</template>

<style scoped>
  .header {
    background-color: var(--app-dark);
  }
</style>
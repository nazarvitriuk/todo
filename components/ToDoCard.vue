<script setup>

import { todoCompletionStatuses, todoPriorityStatusesStyles, todoCompletionStatusesStyles } from "~/config/statuses.js";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    default: ''
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  displayOnly: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['delete', 'edit', 'statusChange', 'favoriteChange']);
const currentTodoStatus = ref(props.status);

function onTodoStatusChange(e) {
  emits('statusChange', e);
}

function toggleFavorite() {
  emits('favoriteChange')
}
</script>

<template>
  <div class="p-3 rounded-[8px] border-2 border-sky-100 bg-sky-50 flex gap-3 flex-col">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="flex items-center gap-2">
        <UButton
          :disabled="displayOnly"
          v-show="isFavorite"
          class="min-w-[44px] flex justify-center items-center"
          size="xl"
          icon="i-heroicons-solid-star"
          variant="ghost"
          color="orange"
          @click="toggleFavorite"
        />
        <UButton
          :disabled="displayOnly"
          v-show="!isFavorite"
          class="min-w-[44px] flex justify-center items-center"
          icon="i-heroicons-star"
          variant="ghost"
          color="orange"
          @click="toggleFavorite"
        />
        <nuxt-link :to="!displayOnly ? `/task/${ id }` : ''">
          <h3 class="text-2xl font-bold">
            {{ title }}
          </h3>
        </nuxt-link>
        <div class="ml-2 flex gap-1 items-center font-medium">
          <UIcon
            class="text-2xl"
            :name="todoPriorityStatusesStyles[priority].icon"
            :style="{ 'color': todoPriorityStatusesStyles[priority].color }"
          />
          <span class="text-sm">
            {{ priority }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <USelectMenu
          v-model="currentTodoStatus"
          :disabled="displayOnly"
          class="flex-1 md:flex-auto min-w-[160px]"
          :options="todoCompletionStatuses"
          option-attribute="name"
          @change="onTodoStatusChange"
        >
          <template #leading>
            <div
              class="rounded-r-lg w-[4px] h-[22px] mr-1"
              :style="{ 'background': todoCompletionStatusesStyles[currentTodoStatus].color }"></div>
          </template>

          <template #option="{ option: option }">
            <div
              class="rounded-r-lg w-[4px] h-[22px] mr-1"
              :style="{ 'background': todoCompletionStatusesStyles[option].color }"
            ></div>
            {{ option }}
          </template>
        </USelectMenu>

        <UButton
          :disabled="displayOnly"
          size="xl"
          icon="i-line-md:edit"
          variant="ghost"
          color="white"
          @click="emits('edit')"
        />
        <UButton
          :disabled="displayOnly"
          size="xl"
          icon="i-heroicons-trash"
          variant="ghost"
          color="white"
          @click="emits('delete')"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3 lg:flex-row md:justify-between">
      <div class="flex">
        <p class="truncate max-w-[400px] md:max-w-[683px]">
          {{ description }}
        </p>
      </div>

      <div>
        <p class="text-right font-bold text-cyan-800">ID: {{ id }}</p>
        <p class="text-right font-bold text-cyan-800">{{ createdAt }}</p>
      </div>
    </div>
  </div>
</template> font-bold

<style scoped>

</style>
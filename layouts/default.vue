<script setup lang="ts">

import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
</script>

<template>
  <div>
    <AppHeader />
    <div class="py-[150px] md:py-[94px]">
      <slot></slot>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>

</style>
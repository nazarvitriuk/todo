<script setup lang="ts">

</script>

<template>
  <footer class="footer w-full fixed bottom-0 z-10 md:h-[70px]">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-center py-2 md:py-2 md:gap-20 h-full">
      <nuxt-link class="cursor-pointer">Privacy Policy</nuxt-link>
      <nuxt-link class="cursor-pointer">Contact Us</nuxt-link>
      <nuxt-link class="cursor-pointer">About Us</nuxt-link>
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    background-color: var(--app-dark);
    color: #C6C9E1;
  }
</style>
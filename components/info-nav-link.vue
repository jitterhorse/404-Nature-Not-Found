<template>
  <nuxt-link
    :to="to"
    :class="{ active: $route.fullPath === to }"
  >
    <img
      :src="src"
      alt=""
    >
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ to: string, src: string }>()
</script>

<style scoped>
a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--padding);

  text-decoration: none;
  color: white;
}
.active {
  text-decoration: underline;
}
img {
  height: 2rem;
}
</style>
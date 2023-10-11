<template>
  <div v-if="count > 0">
    {{ count }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{ count: number }>()
</script>

<style scoped>
div {
  position: absolute;
  top: calc(-0.25 * var(--unit));
  right: calc(-0.25 * var(--unit));
  background-color: var(--yellow);
  color: black;

  width: var(--unit);
  height: var(--unit);
  border-radius: calc(0.5 * var(--unit));

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
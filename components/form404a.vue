<template>
  <button
    value="Close"
    class="icon"
    @click="showPage404"
  >
    <CloseIcon />
  </button>
  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
</template>

<script setup lang="ts">
import CloseIcon from '~/assets/svg/close.svg'
</script>

<style scoped>
button {
  border: 2px solid black;
  font: inherit;
  padding: 0 calc(2 * var(--padding));
}
button.icon {
  width: 2rem;
  height: 2rem;
  padding: 0;
}
</style>
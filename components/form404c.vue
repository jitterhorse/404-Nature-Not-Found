<template>
  Lorem ipsum dolor sit, consectetuer adipiscing elit.

  <div class="buttons">
    <button
      @click="showPage404"
    >
      Lorem
    </button>
    <button
      @click="showPage404"
    >
      Ipsum
    </button>
  </div>
</template>


<script setup lang="ts">
</script>
<style scoped>
button {
  border: 2px solid black;
  font: inherit;
  padding: 0 calc(2 * var(--padding));
}
.buttons {
  display: flex;
  justify-content: end;
  gap: var(--padding);
}
</style>
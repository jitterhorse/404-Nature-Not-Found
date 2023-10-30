<template>
  <div>
    <gray-text>
      {{ title }}
    </gray-text>
    <br>
    <img
      v-if="src"
      :src="src"
    >
    <div
      v-else
      class="image-placeholder"
    >
      <div>
        404 - Bild nicht gefunden
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string, src: string | undefined }>()
</script>

<style scoped>
.image-placeholder {
  aspect-ratio: 3 / 2;
  background: var(--gray) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 10 10'> <path d='M0 0 L10 10 L11 5 L10 0 L 0 10' fill='none' stroke='black' stroke-width='0.01' /></svg>") no-repeat center center;
  background-size: 100% 100%, auto;
  color: black;

  border: 0.5em solid var(--gray);

  display: flex;
  justify-content: center;
  align-items: center;
}
.image-placeholder > div {
  background-color: var(--gray);
  padding: 0.5em;
}
</style>
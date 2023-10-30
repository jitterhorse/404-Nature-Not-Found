<template>
  <div
    class="overlay"
    :class="{fade: fadeOutAnimation}"
  >
    <header404 />
  </div>
</template>

<script setup lang="ts">
import {sleep} from "~/utils/misc";

const { end } = defineProps<{ end: () => void }>()

const fadeOutAnimation = ref(false)

if (process.client) {
  (async () => {
    await sleep(5000)
    fadeOutAnimation.value = true
    await sleep(10000)
    end()
  })()
}
</script>

<style scoped>
.overlay {
  background-color: white;
  transition: opacity ease-in-out 10s;
}
.overlay.fade {
  opacity: 0;
}
</style>
<template>
  <div
    v-if="introStage < 2"
    class="overlay"
    :class="{fade: introStage === 1}"
  >
    <header404 />
  </div>
</template>

<script setup lang="ts">
import {sleep} from "~/utils/misc";

const { end } = defineProps<{ end: () => void }>()

const introStage = ref(0)

if (process.client) {
  (async () => {
    await sleep(5000)
    introStage.value = 1
    await sleep(10000)
    introStage.value = 2
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
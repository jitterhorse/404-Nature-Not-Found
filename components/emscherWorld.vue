<template>
  <div
    id="render-container"
    ref="renderContainer"
  />
</template>

<script setup>
  import {worldSetup} from "~/utils/worldSetup.js";
  import { ref, onMounted} from "vue";

  const renderContainer = ref(null)
  var scene = ref(null)

  onMounted(() => {
    scene = new worldSetup(renderContainer.value);
    scene.start();
  })
</script>

<style>
#render-container {
  position: fixed;
  z-index: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  background-color: black;
}
</style>
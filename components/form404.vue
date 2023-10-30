<template>
    <div class="form-container">
        <div>test</div>
        <button @click="stop404Event" value="Close">Close</button>
    </div>
</template>

<script setup lang="ts">
const stop404Event = () => {
  console.log("close");
  appState.event404 = false;
}
</script>

<style scoped>
.form-container {
    position: fixed;
    z-index: 28;
    @media (min-width: 800px) {
      top: 50%;
      left: 50%;
      width: 300px;
      height: 300px;
      transform: translate(-50%, -50%);
      max-width: 15em;
      max-height: 30em;
      border: white 2px solid;
    }
    @media (max-width: 799px) {
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
    background-color: rgb(255, 255, 255);
    padding: var(--padding);
  
    display: flex;
    flex-direction: column;
  }
</style>
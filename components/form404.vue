<template>
  <div class="form-container">
    <form404a v-if="variant === 1" />
    <form404b v-if="variant === 2" />
    <form404c v-if="variant === 3" />
  </div>
</template>

<script setup>
const variant = Math.floor(Math.random() * 3) + 1;
</script>

<style scoped>
.form-container {
  position: fixed;
  z-index: 30;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--unit);

  @media (min-width: 800px) {
    top: 50%;
    left: 50%;
    width: 300px;
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

    justify-content: center;
  }

  background-color: rgb(255, 255, 255);
  padding: var(--unit);

  font-family: var(--wireframe-font);
  color: black;
  font-size: 150%;
}
</style>
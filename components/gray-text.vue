<template>
  <div class="container">
    <div class="gray">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.gray {
  padding: 0.2em;
  background-color: var(--gray);
  color: black;
  display: inline-block;
}
</style>
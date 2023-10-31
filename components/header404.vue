<template>
  <div class="main center">
    <div class="box1">
      <ErrIcon />
    </div>
    <div class="box2">
      <h1>404 Natur nicht gefunden</h1>
      <h1>404 Nature not found</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import ErrIcon from '~/assets/svg/404_err_cross1.svg'
</script>
<style scoped>
  h1 {
    color: black;
  }
  .box1{
    width: auto;
    min-width: 100px;
    display: flex;
    justify-content: space-around;
  }
  .box2{
    margin: 10px;
    padding: 10px;
  }
  .center {
    background-color: var(--gray);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 50vh;
    transform: translateY(-50%);
    align-content: space-around;
    justify-content: space-around;
  }
</style>
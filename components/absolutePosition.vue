<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  vertical: 'top' | 'bottom',
  horizontal: 'left' | 'right',
  zIndex?: number | 'initial',
}>(), { zIndex: 'initial'})

const position = props.orientation ? 'fixed' : 'initial'
const top = props.vertical === 'top' ? 'var(--unit)' : 'initial';
const bottom = props.vertical === 'bottom' ? 'var(--unit)' : 'initial';
const left = props.horizontal === 'left' ? 'var(--unit)' : 'initial';
const right = props.horizontal === 'right' ? 'var(--unit)' : 'initial';
</script>

<style scoped>
div {
  position: fixed;
  top: v-bind('top');
  bottom: v-bind('bottom');
  right: v-bind('right');
  left: v-bind('left');
  z-index: v-bind('zIndex');
}
</style>
<template>
  <button>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  absolutePosition: {
    type: [Array, String],
    default: undefined
  }
})
const position = props.absolutePosition ? 'fixed' : 'initial'
const top = props.absolutePosition && props.absolutePosition[0] === 'top' ? 'var(--unit)' : 'initial';
const bottom = props.absolutePosition && props.absolutePosition[0] === 'bottom' ? 'var(--unit)' : 'initial';
const left = props.absolutePosition && props.absolutePosition[1] === 'left' ? 'var(--unit)' : 'initial';
const right = props.absolutePosition && props.absolutePosition[1] === 'right' ? 'var(--unit)' : 'initial';
</script>

<style scoped>
button {
  cursor: pointer;
  background-color: var(--pink);
  color: var(--yellow);
  border: none;
  width: calc(var(--unit) * 3);
  height: calc(var(--unit) * 3);
  border-radius: calc(var(--unit) * 1.5);
  display: flex;
  align-items: center;
  justify-content: center;

  position: v-bind('position');
  top: v-bind('top');
  bottom: v-bind('bottom');
  right: v-bind('right');
  left: v-bind('left');

}

/deep/ svg {
  width: calc(var(--unit) * 2);
  height: calc(var(--unit) * 2);
}
</style>
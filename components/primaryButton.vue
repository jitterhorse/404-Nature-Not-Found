<template>
  <button v-if="componentType === 'button'" @click="click" :type="type">
    <slot />
  </button>
  <NuxtLink
    v-if="componentType === 'link'"
    :to="href"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  absolutePosition?: [String, String],
  href?: String
  click?: () => void
  size?: number
  type?: string
}>(), { size: 1, type: 'button' })

const position = props.absolutePosition ? 'fixed' : 'initial'
const top = props.absolutePosition && props.absolutePosition[0] === 'top' ? 'var(--unit)' : 'initial';
const bottom = props.absolutePosition && props.absolutePosition[0] === 'bottom' ? 'var(--unit)' : 'initial';
const left = props.absolutePosition && props.absolutePosition[1] === 'left' ? 'var(--unit)' : 'initial';
const right = props.absolutePosition && props.absolutePosition[1] === 'right' ? 'var(--unit)' : 'initial';

const componentType = props.href ? 'link' : 'button';
</script>

<style scoped>
button, a {
  cursor: pointer;
  background-color: var(--pink);
  color: var(--yellow);
  border: none;
  width: calc(v-bind(size) * calc(var(--unit) * 3));
  height: calc(v-bind(size) * calc(var(--unit) * 3));
  border-radius: calc(v-bind(size) * calc(var(--unit) * 1.5));
  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
}

/deep/ svg {
  width: calc(v-bind(size) * calc(var(--unit) * 2));
  height: calc(v-bind(size) * calc(var(--unit) * 2));
}
</style>
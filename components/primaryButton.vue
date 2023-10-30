<template>
  <button
    v-if="componentType === 'button'"
    :type="type"
    @click="click"
  >
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
  href?: String
  click?: () => void
  size?: number
  type?: string
}>(), { size: 1, type: 'button' })

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
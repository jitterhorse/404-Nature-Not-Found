<template>
  <button
    v-if="type === 'button'"
    type="button"
    @click="click"
  >
    <slot />
    {{ caption }}
  </button>
  <NuxtLink
    v-if="type === 'link'"
    :to="href"
  >
    <slot />
    {{ caption }}
  </NuxtLink>
</template>

<script setup lang="ts">
  const props = defineProps<{
    captionPosition?: 'above' | 'below',
    href?: String,
    caption: String,
    click?: () => void
  }>()
  const flexDirection = props.captionPosition === 'above' ? 'column-reverse' : 'column';
  const type = props.href ? 'link' : 'button';
</script>

<style scoped>
button, a {
  display: flex;
  flex-direction: v-bind(flexDirection);
  align-items: center;
  border: none;
  background: none;
  color: white;
  text-decoration: none;
}
</style>
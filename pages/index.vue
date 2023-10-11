<template>
  <div>
    <emscher-world />
    <nav>
      <primary-button>
        <BackIcon />
      </primary-button>
      <primary-button href="/info">404</primary-button>
      <primary-button>
        <ForwardIcon />
      </primary-button>
    </nav>
    <absolute-position vertical="bottom" horizontal="right" z-index="21">
      <primary-button :click="() => isChatOpen = !isChatOpen">
        <close-icon v-if="isChatOpen" />
        <chat-icon v-else />
      </primary-button>
    </absolute-position>
    <chat v-if="isChatOpen" :close-chat="() => isChatOpen = false"></chat>
    <main>
      <!-- pop ups etc -->
    </main>
  </div>
</template>

<script setup lang="ts">
import BackIcon from '~/assets/svg/back.svg'
import ForwardIcon from '~/assets/svg/forward.svg'
import ChatIcon from '~/assets/svg/chat.svg'
import CloseIcon from '~/assets/svg/close.svg'

const isChatOpen = ref(false)
watch(isChatOpen, () => {
  window.dispatchEvent(new CustomEvent('renderer-status', { detail: { targetStatus: !isChatOpen.value}}))
})
</script>

<style scoped>
nav {
  position: fixed;
  z-index: 10;
  top: var(--unit);
  right: var(--unit);
  left: var(--unit);

  display: flex;
  justify-content: space-between;
}
main {
  position: relative;
  z-index: 1;
}
</style>
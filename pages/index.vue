<template>
  <div>
    <initial-overlay404 :end="introEnded" />
    <emscher-world />
    <nav>
      <primary-button :click="() => goScene(-1)">
        <BackIcon />
      </primary-button>
      <primary-button href="/info">
        404
      </primary-button>
      <primary-button :click="() => goScene(+1)">
        <ForwardIcon />
      </primary-button>
    </nav>
    <absolute-position
      vertical="bottom"
      horizontal="right"
      z-index="21"
    >
      <primary-button :click="() => appState.isChatOpen ? closeChat() : openChat()">
        <ClientOnly>
          <badge-count :count="appState.unreadMessages" />
        </ClientOnly>
        <close-icon v-if="appState.isChatOpen" />
        <chat-icon v-else />
      </primary-button>
    </absolute-position>
    <chat
      v-if="appState.isChatOpen"
      :close-chat="closeChat"
    />
    <form404 v-if="appState.currentPage404 === 'FORM'" />
    <page404
      v-if="appState.currentPage404 && appState.currentPage404 !== 'FORM'"
      :page404="appState.currentPage404"
    />
  </div>
</template>

<script setup lang="ts">
import BackIcon from '~/assets/svg/back.svg'
import ForwardIcon from '~/assets/svg/forward.svg'
import ChatIcon from '~/assets/svg/chat.svg'
import CloseIcon from '~/assets/svg/close.svg'
import {useSimplifiedSeo} from "~/utils/seo";

useSimplifiedSeo({
  title: '404 - Natur nicht gefunden / Nature not found || Online-Kunstwerk zur Renaturierung der Emscher und Natur aus zweiter Hand'
})

watch(
    () => appState.isChatOpen,
    () => {
      if (appState.isChatOpen) {
        appState.unreadMessages = 0;
      }
      window.dispatchEvent(new CustomEvent('renderer-status', {detail: {targetStatus: !appState.isChatOpen}}))
    }
)

watch(
    () => appState.currentPage404 === undefined,
    () => {
      window.dispatchEvent(new CustomEvent('renderer-status', {detail: {targetStatus: appState.currentPage404 === undefined}}))
    }
)

const introEnded = () => {
  startAutoChat()
  startAuto404()
}
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
</style>
<template>
  <div class="chat-backdrop"></div>
  <div class="chat-container">
    <div class="chat-navbar">
      <h2>Chat</h2>
      <icon-button caption="schließen" :click="closeChat"><ant-icon></ant-icon></icon-button>
    </div>
    <div class="chat-messages-container">
      <div class="chat-message">
        Text
      </div>
      <div class="chat-message">
        More text
      </div>
      <div class="chat-message outgoing">
        Message from user
      </div>
    </div>
    <div class="chat-composing-area">
      <textarea></textarea>
      <primary-button :size="0.5"><send-icon /></primary-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AntIcon from '~/assets/svg/ant.svg'
import SendIcon from '~/assets/svg/send.svg'

defineProps<{
  closeChat: () => void
}>()
</script>

<style scoped>
.chat-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  z-index: 20;
  backdrop-filter: saturate(20%) brightness(80%);
}
.chat-container {
  position: fixed;
  z-index: 25;
  @media (min-width: 800px) {
    bottom: calc(4 * var(--unit));
    right: calc(4 * var(--unit));
    width: 100%;
    height: 100%;
    max-width: 15em;
    max-height: 30em;

    border: white 2px solid;
  }
  @media (max-width: 799px) {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  background-color: black;
  padding: var(--padding);

  display: flex;
  flex-direction: column;
}
.chat-navbar {
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--padding);

  @media (min-width: 800px) {
    display: none;
  }
}
.chat-messages-container {
  display: flex;
  flex-direction: column;
  gap: var(--padding);
}
.chat-message {
  border-radius: 2px;
  background-color: var(--pink);
  color: black;
  padding: var(--padding);
  width: 80%;
}
.chat-message.outgoing {
  background-color: var(--yellow);
  align-self: flex-end;
}
.chat-composing-area {
  margin-top: auto;
  display: flex;
  gap: var(--padding);
  align-items: center;
}
textarea {
  flex: 1;
  font-family: var(--body-font);
  font-size: 120%;
}
</style>
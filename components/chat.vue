<template>
  <div class="chat-backdrop" />
  <div class="chat-container">
    <div class="chat-navbar">
      <h2>Chat</h2>
      <icon-button
        caption="schließen"
        :click="closeChat"
      >
        <ant-icon />
      </icon-button>
    </div>
    <div
      ref="messagesContainer"
      class="chat-messages-container"
    >
      <chat-message
        v-for="message in appState.messages"
        :key="message.id"
        :message="message"
      />
      <chat-message
        v-if="appState.isSimulateTyping"
        key="typing"
        :message="{id: 'typing', mediaType: 'image', mediaFile: TypingAnimation, direction: ChatMessageDirection.INCOMING}"
      />
    </div>
    <form
      class="chat-composing-area"
      @submit.prevent="submitMessage"
    >
      <textarea
        ref="textInput"
        @keyup.enter.prevent="(event) => event.target.parentNode.requestSubmit()"
      />
      <primary-button
        :size="0.5"
        type="submit"
      >
        <send-icon />
      </primary-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import AntIcon from '~/assets/svg/ant.svg'
import SendIcon from '~/assets/svg/send.svg'
import TypingAnimation from "~/assets/svg/typing.svg?url"
import {ChatMessageDirection} from "~/data/types";
import {insertUserMessage} from "~/utils/chatLogic";

const textInput = ref<HTMLInputElement | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)

defineProps<{
  closeChat: () => void
}>()

const submitMessage = () => {
  if (!textInput.value) {
    return;
  }
  const messageText = textInput.value.value
  if (messageText.trim().length) {
    insertUserMessage(messageText);
  }
  textInput.value.value = ''
}

watch([() => appState.isSimulateTyping, appState.messages], () => {
  setTimeout(() => {
    if (!messagesContainer.value) {
      return;
    }
    messagesContainer.value.scrollTo(0, messagesContainer.value.scrollHeight)
  }, 10)
})
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
  padding-bottom: var(--padding);

  overflow-y: auto;
}
.chat-composing-area {
  margin-top: auto;
  display: flex;
  gap: var(--padding);
  align-items: center;
}
textarea {
  flex: 1;
  min-width: 0;
  font-family: var(--body-font);
  font-size: 120%;
}
</style>
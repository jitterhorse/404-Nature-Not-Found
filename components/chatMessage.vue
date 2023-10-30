<template>
  <div
    class="chat-message"
    :class="{ 
      outgoing: message.direction === ChatMessageDirection.OUTGOING, 
      system: message.direction === ChatMessageDirection.SYSTEM,
      typing: message.mediaFile?.includes('typing') 
    }"
  >
    <img
      v-if="message.mediaType === 'image'"
      :src="message.mediaFile.startsWith('/') ? message.mediaFile : '/media/' + message.mediaFile"
      alt=""
    >
    <div
      v-if="message.text && message.direction !== ChatMessageDirection.OUTGOING"
      v-html="message.text"
    />
    <div
      v-if="message.text && message.direction === ChatMessageDirection.OUTGOING"
    >
      {{ message.text }}
    </div>
    <small>
      {{ message.comment }}
    </small>
  </div>
</template>

<script setup lang="ts">
import {ChatMessage, ChatMessageDirection} from "~/data/types";

defineProps<{message: ChatMessage}>()
</script>

<style scoped>
.chat-message {
  border-radius: 2px;
  background-color: lightgray;
  color: black;
  padding: var(--padding);
  width: 80%;

  word-break: break-word;
}
.chat-message.outgoing {
  background-color: var(--yellow);
  align-self: flex-end;
}
.chat-message.system {
  background: none;
  color: grey;
  width: initial;
  text-align: center;
}
.chat-message.typing {
  width: 50px;
}
img {
  width: 100%;
}
small {
  display: block;
  text-align: right;
}
:deep(p) {
  margin: 0;
}
:deep(mark.chat-mark-yellow) {
  --background-color: var(--yellow);
}
:deep(mark.chat-mark-pink) {
  --background-color: var(--pink);
}
:deep(mark) {
  margin: 0 -0.4em;
  padding: 0.1em 0.4em;
  border-radius: 0.8em 0.3em;
  background: transparent linear-gradient(
      to right,
      color-mix(in srgb, var(--background-color) 10%, transparent),
      color-mix(in srgb, var(--background-color) 70%, transparent) 4%,
      color-mix(in srgb, var(--background-color) 30%, transparent)
  );
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
</style>
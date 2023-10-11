<template>
  <div class="chat-message" :class="{ outgoing: message.direction === ChatMessageDirection.OUTGOING }">
    <img :src="'/media/' + message.mediaFile" v-if="message.mediaType === 'image'" alt="" />
    {{ message.text }}
    <small>
      {{ message.comment }}
    </small>
  </div>
</template>

<script setup lang="ts">
import {ChatMessage, ChatMessageDirection} from "~/data/types";

defineProps<{message: ChatMessage}>()
</script>

<style>
.chat-message {
  border-radius: 2px;
  background-color: var(--pink);
  color: black;
  padding: var(--padding);
  width: 80%;

  word-break: break-word;
}
.chat-message.outgoing {
  background-color: var(--yellow);
  align-self: flex-end;
}
img {
  width: 100%;
}
</style>
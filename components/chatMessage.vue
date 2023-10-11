<template>
  <div class="chat-message" :class="{ outgoing }">
    <img :src="'/media/' + chatEntry?.mediaFile" v-if="chatEntry && chatEntry.mediaType === 'image'" alt="" />
    {{ chatEntry?.message }}
    <small>
      {{ chatEntry?.comment }}
    </small>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {ChatEntry} from "~/data/types";

defineProps<{chatEntry?: ChatEntry, outgoing?: boolean}>()
</script>

<style>
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
img {
  width: 100%;
}
</style>
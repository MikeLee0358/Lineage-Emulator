<template>
  <ul class="uiChat">
    <li v-for="(chatline, index) in storeChat.chat.lines" :key="index">
      {{ chatline }}
    </li>
  </ul>
</template>

<script setup>
import { useChatStore } from "../stores/chat";
const storeChat = useChatStore();
</script>

<style lang="scss" scoped>
.uiChat {
  grid-area: uiChat;
  position: relative;
  top: 2.1%;

  li {
    height: 14.28%;
    line-height: 100%;
    font-size: clamp(12px, 1.5vw, 26px);
    transform: scaleY(0.55);
    color: var(--color-yellow);
  }
}

@media screen and (min-height: 450px) {
  .uiChat li {
    transform: scaleY(0.6);
  }
}
</style>

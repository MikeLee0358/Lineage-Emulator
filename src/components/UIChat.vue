<template>
  <ul>
    <!-- <li v-for="chatline in algorithmStore.chatLines">{{ chatline }}</li> -->
  </ul>
</template>

<script setup>
import { useChatStore } from "../stores/chat";
const chatStore = useChatStore();
</script>

<style scoped>
li {
  height: 14.28%;
  line-height: 100%;
  font-size: clamp(12px, 1.7vw, 26px);
  transform: scaleY(0.55);
  color: var(--color-yellow);
}

@media screen and (min-height: 450px) {
  li {
    transform: scaleY(0.65);
  }
}
</style>

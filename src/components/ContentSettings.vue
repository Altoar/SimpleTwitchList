<template>
  <div class="content-settings">
    <h2>Settings</h2>
    <div class="content-settings__section">
      <h3>Connection</h3>
      <BaseButton
        size="md"
        title="Disconnect Twitch"
        primary
        icon="arrow-right-from-bracket"
        @click="mainStore.logoutTwitch()" />
    </div>
    <div class="content-settings__section">
      <h3>About</h3>

      GitHub:
      <BaseLink href="https://github.com/Altoar/twitch-livelist" type="text"
        >https://github.com/Altoar/twitch-livelist</BaseLink
      >
    </div>

    <div class="content-settings__footer">
      This browser extension is not affiliated with Twitch Interactive, Inc.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import BaseButton from "@/ui/BaseButton.vue";
import BaseLink from "@/ui/BaseLink.vue";
const mainStore = useMainStore();
</script>

<style lang="scss" scoped>
.content-settings {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: var(--text-primary);
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-primary);
    margin-bottom: 10px;
  }
  &__section {
    margin-top: 20px;
    border-bottom: 1px solid var(--border-primary);
    padding-bottom: 20px;
  }

  &__footer {
    text-align: center;
    margin-top: auto;
    margin-top: auto;
    padding: 20px;
    font-size: 10px;
    color: var(--text-secondary);
  }
}
</style>

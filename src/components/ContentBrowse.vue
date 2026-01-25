<template>
  <div class="content-browse">
    <div class="content-browse__header">
      <BaseButton
        size="sm"
        square
        transparent
        icon="arrows-rotate"
        :loading="twitchStore.fetchTopChannelsStatus === 'loading'"
        @click="twitchStore.getTopChannels(true)" />
    </div>

    <StreamListItem
      v-for="channel in twitchStore.topChannels"
      :key="channel.id"
      :stream="channel" />

    <div class="content-browse__footer">
      <BaseButton
        size="sm"
        title="Load More"
        primary
        icon="arrows-rotate"
        :loading="false"
        @click="twitchStore.getTopChannels()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useTwitchStore } from "@/stores/twitch";
import StreamListItem from "./StreamListItem.vue";
import BaseButton from "@/ui/BaseButton.vue";

const twitchStore = useTwitchStore();

onBeforeMount(() => {
  twitchStore.getTopChannels();
});
</script>

<style lang="scss" scoped>
.content-browse {
  &__header {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    margin-bottom: 5px;
  }
  &__footer {
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}
</style>

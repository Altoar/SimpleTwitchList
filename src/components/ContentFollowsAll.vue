<template>
  <div class="content-follows-all">
    <ContentLoading
      v-if="twitchStore.fetchFollowedChannelsStatus === 'loading'" />
    <div
      class="content-follows-all__error"
      v-else-if="twitchStore.fetchFollowedChannelsStatus === 'error'">
      An error occurred. Please try again.
    </div>
    <template v-else>
      <div class="content-follows-all__header">
        All Followed Channels ({{ twitchStore.followedChannels.length }})
      </div>
      <ChannelListItem
        v-for="channel in twitchStore.followedChannels"
        :key="channel.id"
        :channel="channel" />
    </template>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useTwitchStore } from "@/stores/twitch";
import ChannelListItem from "./ChannelListItem.vue";
import ContentLoading from "./ContentLoading.vue";

const twitchStore = useTwitchStore();

onBeforeMount(() => {
  twitchStore.getFollowedChannels();
});
</script>

<style lang="scss" scoped>
.content-follows-all {
  &__header {
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 5px;
  }
  &__error {
    padding: 20px;
    text-align: center;
    color: var(--text-secondary);
  }
}
</style>

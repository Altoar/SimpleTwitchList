<template>
  <BaseButton
    title="Refresh Follows"
    size="sm"
    icon="arrows-rotate"
    :loading="twitchStore.fetchFollowedChannelsStatus === 'loading'"
    @click="twitchStore.getFollowedChannels()" />

  <StreamListItem
    v-for="channel in twitchStore.followedChannels"
    :key="channel.id"
    :stream="channel" />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useMainStore } from "@/stores/main";
import { useTwitchStore } from "@/stores/twitch";
import BaseButton from "@/ui/BaseButton.vue";
import StreamListItem from "./StreamListItem.vue";

const mainStore = useMainStore();
const twitchStore = useTwitchStore();

onBeforeMount(() => {
  twitchStore.getFollowedChannels();
});
</script>

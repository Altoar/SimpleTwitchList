<template>
  <div class="content-browse">
    <div class="content-browse__header">
      <BaseSelect
        :options="languages"
        v-model="twitchStore.topChannelsLanguage"
        @update:modelValue="
          () => {
            twitchStore.getTopChannels({
              reset: true,
              language: twitchStore.topChannelsLanguage as string
            });
          }
        " />

      <BaseButton
        size="sm"
        square
        transparent
        icon="arrows-rotate"
        :loading="twitchStore.fetchTopChannelsStatus === 'loading'"
        @click="
          twitchStore.getTopChannels({
            reset: true,
            language: twitchStore.topChannelsLanguage as string
          })
        " />
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
        @click="
          twitchStore.getTopChannels({
            language: twitchStore.topChannelsLanguage as string
          })
        " />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useTwitchStore } from "@/stores/twitch";
import StreamListItem from "./StreamListItem.vue";
import BaseButton from "@/ui/BaseButton.vue";
import BaseSelect from "@/ui/BaseSelect.vue";

const twitchStore = useTwitchStore();

const languages = ref([
  { label: "All Languages", value: "all" },
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "German", value: "de" },
  { label: "French", value: "fr" },
  { label: "Japanese", value: "ja" }
]);

onBeforeMount(() => {
  twitchStore.getTopChannels({
    reset: true,
    language: twitchStore.topChannelsLanguage as string
  });
});
</script>

<style lang="scss" scoped>
.content-browse {
  &__header {
    display: flex;
    justify-content: space-between;
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

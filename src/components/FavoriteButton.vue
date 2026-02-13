<template>
  <InvisibleButton
    @click.prevent="
      isFavorited
        ? twitchStore.removeChannelFromFavorites(props.userId)
        : twitchStore.addChannelToFavorites(props.userId)
    "
    class="favorite-button"
    :class="{
      'favorite-button--favorited': isFavorited
    }">
    <Icon
      v-tooltip.bottom-end="
        isFavorited ? 'Remove from Favorites' : 'Add to Favorites'
      "
      :icon="isFavorited ? 'star' : ['far', 'star']"
      title="Favorited Stream" />
  </InvisibleButton>
</template>
<script setup lang="ts">
import { computed } from "vue";
import InvisibleButton from "@/ui/InvisibleButton.vue";
import { useTwitchStore } from "@/stores/twitch";

const twitchStore = useTwitchStore();

const props = defineProps<{
  userId: string;
}>();

const isFavorited = computed(() => {
  return twitchStore.favoriteChannelIds.has(props.userId);
});
</script>

<style lang="scss" scoped>
.favorite-button {
  opacity: 0;
  transition: opacity 0.15s ease;
  color: var(--text-secondary);

  &:hover,
  &--favorited {
    color: var(--accent-color);
    opacity: 1;
  }

  &--favorited {
    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useApi } from "@/composables/useTwitchApi";
import { useMainStore } from "./main";

const callApi = useApi();

export interface TwitchApiFollowedChannel {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
}

export interface TwitchApiFollowedChannelsResponse {
  data: TwitchApiFollowedChannel[];
  pagination: {
    cursor?: string;
  };
}

export const useTwitchStore = defineStore("twitch", () => {
  const mainStore = useMainStore();

  const followedChannels = ref<TwitchApiFollowedChannel[]>([]);
  const fetchFollowedChannelsStatus = ref<
    "idle" | "loading" | "error" | "success"
  >("idle");

  async function getFollowedChannels() {
    if (!mainStore.isLoggedIn) {
      console.warn(
        "User is not logged in to Twitch, cannot fetch followed channels"
      );
      return;
    }

    if (fetchFollowedChannelsStatus.value === "loading") {
      return;
    }

    const allChannels: TwitchApiFollowedChannel[] = [];
    let cursor: string | undefined = undefined;

    do {
      fetchFollowedChannelsStatus.value = "loading";

      try {
        const response: TwitchApiFollowedChannelsResponse =
          await callApi<TwitchApiFollowedChannelsResponse>(
            "/streams/followed",
            "GET",
            {
              params: {
                user_id: mainStore.twitchData?.user?.id,
                first: 100,
                after: cursor
              }
            }
          );

        allChannels.push(...response.data);
        cursor = response.pagination.cursor;
      } catch (error) {
        console.error("Error fetching followed channels:", error);
        fetchFollowedChannelsStatus.value = "error";
        return;
      }
    } while (cursor);

    fetchFollowedChannelsStatus.value = "success";
    followedChannels.value = allChannels;
  }
  return {
    followedChannels,
    fetchFollowedChannelsStatus,
    getFollowedChannels
  };
});

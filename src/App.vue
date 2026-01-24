<template>
  <a href="/">Home</a> | <a href="/auth">Auth</a> |
  <a href="/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Home from "./views/Home.vue";
import Auth from "./views/Auth.vue";
import type { Component } from "vue";

//Simple router
const routes: { [key: string]: Component } = {
  "": Home,
  auth: Auth
};

const currentView = computed(() => {
  const path = window.location.pathname.slice(1); // Remove '/' from the beginning
  return routes[path] || (() => import("./views/NotFound.vue"));
});
</script>

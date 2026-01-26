<template>
  <a
    :href="props.href"
    target="_blank"
    rel="noopener noreferrer"
    :class="props.type == 'text' ? 'text' : ''">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string;
  type?: string;
}>();
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;

  &.text {
    color: var(--text-link);
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

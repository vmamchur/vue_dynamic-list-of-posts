<script setup lang="ts">
import type { IComment } from '@/types/IComment'

const props = defineProps<{
  comment: IComment
}>()

const emit = defineEmits(['remove'])
</script>

<template>
  <article class="message is-small">
    <div class="message-header">
      <a>{{ comment.name }}</a>
      <button
        @click="$emit('remove', comment.id)"
        type="button"
        class="delete is-small"
        aria-label="delete"
      >
        delete button
      </button>
    </div>
    <div class="message-body">{{ comment.body }}</div>
  </article>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
const props = defineProps<{
  postId: number
  postTitle: string
  postBody: string
}>()
</script>

<template>
  <div class="block">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#{{ postId }}: {{ postTitle }}</h2>
      <div class="is-flex">
        <span class="icon is-small is-right is-clickable">
          <i class="fas fa-pen-to-square"></i>
        </span>

        <span class="icon is-small is-right has-text-danger is-clickable ml-3">
          <i class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ postBody }}</p>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type IPost } from '@/types/IPost'
import EditPostComponent from './EditPostComponent.vue'

const props = defineProps<{
  selectedPost: IPost
}>()

const emit = defineEmits(['edit', 'remove'])

const isEditing = ref(false)

watch(
  () => props.selectedPost,
  (curr, prev) => {
    if (curr !== prev) {
      isEditing.value = false
    }
  }
)
</script>

<template>
  <EditPostComponent
    v-if="isEditing"
    @save="
      $emit('edit', {
        id: $event.id,
        userId: $event.userId,
        title: $event.title,
        body: $event.body
      })
    "
    @cancel="isEditing = false"
    :selectedPost="selectedPost"
  />

  <div v-else class="block">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#{{ selectedPost.id }}: {{ selectedPost.title }}</h2>
      <div class="is-flex">
        <span @click="isEditing = true" class="icon is-small is-right is-clickable">
          <i class="fas fa-pen-to-square"></i>
        </span>

        <span
          @click="$emit('remove', selectedPost.id)"
          class="icon is-small is-right has-text-danger is-clickable ml-3"
        >
          <i class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p>{{ selectedPost.body }}</p>
  </div>
</template>

<style lang="scss" scoped></style>

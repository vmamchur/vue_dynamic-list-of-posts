<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import { type IPost } from '@/types/IPost'
import { type IComment } from '@/types/IComment'
import { type ICommentCreation } from '@/types/ICommentCreation'
import { getComments, deleteComment, createComment } from '@/services/commentsService'
import EditPostComponent from './EditPostComponent.vue'
import CommentComponent from './CommentComponent.vue'
import AddCommentComponent from './AddCommentComponent.vue'
import { getAuthData } from '@/utils/authStorage'

const props = defineProps<{
  selectedPost: IPost
}>()

const emit = defineEmits(['edit', 'remove'])

const { name, email } = JSON.parse(getAuthData())

const commentsRef = ref<IComment[]>([])
const commentsErrorRef = ref('')
const isEditingRef = ref(false)
const isCommentCreatingRef = ref(false)

const loadComments = async () => {
  try {
    const { data } = await getComments(props.selectedPost.id)

    commentsRef.value = data
  } catch (e) {
    commentsErrorRef.value = 'Unable to load comments'
    console.log(e)
  }
}

onMounted(() => {
  loadComments()
})

const handleCreateComment = async (comment: ICommentCreation) => {
  try {
    const { data } = await createComment(comment)

    commentsRef.value = [...commentsRef.value, data]
    isCommentCreatingRef.value = false
  } catch (e) {
    console.log(e)
  }
}

const handleDeleteComment = async (id: number) => {
  try {
    await deleteComment(id)

    commentsRef.value = commentsRef.value.filter((comment) => comment.id !== id)
  } catch (e) {
    console.log(e)
  }
}

watch(
  () => props.selectedPost,
  (curr, prev) => {
    if (curr !== prev) {
      loadComments()

      if (isEditingRef.value) {
        isEditingRef.value = false
      }

      if (isCommentCreatingRef.value) {
        isCommentCreatingRef.value = false
      }
    }
  }
)
</script>

<template>
  <EditPostComponent
    v-if="isEditingRef"
    @save="
      $emit('edit', {
        id: $event.id,
        userId: $event.userId,
        title: $event.title,
        body: $event.body
      })
    "
    @cancel="isEditingRef = false"
    :selectedPost="selectedPost"
  />

  <template v-else>
    <div class="block">
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <h2>#{{ selectedPost.id }}: {{ selectedPost.title }}</h2>
        <div class="is-flex">
          <span @click="isEditingRef = true" class="icon is-small is-right is-clickable">
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

    <AddCommentComponent
      v-if="isCommentCreatingRef"
      @create="
        handleCreateComment({
          postId: selectedPost.id,
          name,
          email,
          body: $event
        })
      "
      @cancel="isCommentCreatingRef = false"
    />

    <div v-else class="block">
      <template v-if="commentsRef.length">
        <CommentComponent
          v-for="comment of commentsRef"
          @remove="handleDeleteComment"
          :key="comment.id"
          :comment="comment"
        />
      </template>

      <template v-else>
        <p v-if="!commentsRef.length && !commentsErrorRef.length" class="title is-4">
          No comments yet
        </p>
        <p v-else-if="commentsErrorRef.length" class="title is-4 has-text-danger">
          {{ commentsErrorRef }}
        </p>
      </template>

      <button @click="isCommentCreatingRef = true" type="button" className="button is-link">
        Write a comment
      </button>
    </div>
  </template>
</template>

<style lang="scss" scoped></style>

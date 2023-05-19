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

const { name, email } = JSON.parse(getAuthData());

const comments = ref<IComment[]>([])
const commentsError = ref('')
const isEditing = ref(false)
const isCommentCreating = ref(false)

const loadComments = async () => {
  try {
    const { data } = await getComments(props.selectedPost.id)

    comments.value = data
  } catch (e) {
    commentsError.value = 'Unable to load comments'
    console.log(e)
  }
}

onMounted(() => {
  loadComments()
})

const handleCreateComment = async (comment: ICommentCreation) => {
  try {
    const { data } = await createComment(comment)

    comments.value = [...comments.value, data]
    isCommentCreating.value = false
  } catch (e) {
    console.log(e)
  }
}

const handleDeleteComment = async (id: number) => {
  try {
    await deleteComment(id)

    comments.value = comments.value.filter((comment) => comment.id !== id)
  } catch (e) {
    console.log(e)
  }
}

watch(
  () => props.selectedPost,
  (curr, prev) => {
    if (curr !== prev) {
      loadComments()

      if (isEditing.value) {
        isEditing.value = false
      }

      if (isCommentCreating.value) {
        isCommentCreating.value = false
      }
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

  <template v-else>
    <div class="block">
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

    <AddCommentComponent
      v-if="isCommentCreating"
      @create="
        handleCreateComment({
          postId: selectedPost.id,
          name,
          email,
          body: $event
        })
      "
      @cancel="isCommentCreating = false"
    />

    <div v-else class="block">
      <template v-if="comments.length">
        <CommentComponent
          v-for="comment of comments"
          @remove="handleDeleteComment"
          :key="comment.id"
          :comment="comment"
        />
      </template>

      <template v-else>
        <p v-if="!comments.length && !commentsError.length" class="title is-4">No comments yet</p>
        <p v-else-if="commentsError.length" class="title is-4 has-text-danger">
          {{ commentsError }}
        </p>
      </template>

      <button @click="isCommentCreating = true" type="button" className="button is-link">
        Write a comment
      </button>
    </div>
  </template>
</template>

<style lang="scss" scoped></style>

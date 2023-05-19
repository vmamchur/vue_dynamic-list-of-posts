<script setup lang="ts">
import type { IPost } from '@/types/IPost'
import { ref, watch } from 'vue'

const props = defineProps<{
  selectedPost: IPost
}>()

const emit = defineEmits(['cancel', 'save'])

const titleRef = ref(props.selectedPost.title)
const bodyRef = ref(props.selectedPost.body)
const titleErrorRef = ref('')
const bodyErrorRef = ref('')

const handleSubmit = (title: string, body: string) => {
  if (!title.length) {
    titleErrorRef.value = 'Title is required'
  }

  if (!body.length) {
    bodyErrorRef.value = 'Body is required'
  }

  if (titleErrorRef.value.length || bodyErrorRef.value.length) {
    return
  }

  emit('save', {
    id: props.selectedPost.id,
    userId: props.selectedPost.userId,
    title,
    body
  })

  titleRef.value = ''
  bodyRef.value = ''
}

watch(titleRef, () => {
  if (titleErrorRef.value.length) {
    titleErrorRef.value = ''
  }
})

watch(bodyRef, () => {
  if (bodyErrorRef.value.length) {
    bodyErrorRef.value = ''
  }
})
</script>

<template>
  <div className="content">
    <h2>Post editing</h2>

    <form @submit.prevent="handleSubmit(titleRef, bodyRef)">
      <div class="field">
        <label class="label" for="comment-author-name-title">Title</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="titleRef"
            :class="{ 'is-danger': titleErrorRef.length }"
            class="input"
            type="text"
            name="title"
            id="comment-author-name-title"
            placeholder="Post title"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>

          <span v-if="titleErrorRef.length" class="icon is-small is-right has-text-danger">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>

        <p v-if="titleErrorRef.length" class="help is-danger">{{ titleErrorRef }}</p>
      </div>

      <div class="field">
        <label class="label" for="comment-body">Write post body</label>
        <div class="control">
          <textarea
            v-model="bodyRef"
            :class="{ 'is-danger': bodyErrorRef.length }"
            class="textarea"
            id="comment-body"
            name="body"
            placeholder="Post body"
          ></textarea>
        </div>

        <p v-if="bodyErrorRef.length" class="help is-danger">{{ bodyErrorRef }}</p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">Save</button>
        </div>

        <div className="control">
          <button @click="$emit('cancel')" type="reset" className="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>

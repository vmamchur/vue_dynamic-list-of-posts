<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['close', 'create'])

const title = ref('')
const body = ref('')
const titleError = ref('')
const bodyError = ref('')

const handleSubmit = () => {
  if (!title.value.length) {
    titleError.value = 'Title is required'
  }

  if (!body.value.length) {
    bodyError.value = 'Body is required'
  }

  if (titleError.value.length || bodyError.value.length) {
    return
  }

  emit('create', { title: title.value, body: body.value })

  title.value = ''
  body.value = ''
}

watch(title, () => {
  if (titleError.value.length) {
    titleError.value = ''
  }
})

watch(body, () => {
  if (bodyError.value.length) {
    bodyError.value = ''
  }
})
</script>

<template>
  <div className="content">
    <h2>Create new post</h2>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label" for="comment-author-name-title">Title</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="title"
            :class="{ 'is-danger': titleError.length }"
            class="input"
            type="text"
            name="title"
            id="comment-author-name-title"
            placeholder="Post title"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>

          <span v-if="titleError.length" class="icon is-small is-right has-text-danger">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>

        <p v-if="titleError.length" class="help is-danger">{{ titleError }}</p>
      </div>

      <div class="field">
        <label class="label" for="comment-body">Write post body</label>
        <div class="control">
          <textarea
            v-model="body"
            :class="{ 'is-danger': bodyError.length }"
            class="textarea"
            id="comment-body"
            name="body"
            placeholder="Post body"
          ></textarea>
        </div>

        <p v-if="bodyError.length" class="help is-danger">{{ bodyError }}</p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">Create</button>
        </div>

        <div className="control">
          <button @click="$emit('close')" type="reset" className="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['create', 'cancel'])

const bodyRef = ref('')
const nameErrorRef = ref('')
const emailErrorRef = ref('')
const bodyErrorRef = ref('')

const handleSubmit = (body: string) => {
  if (!body.length) {
    bodyErrorRef.value = 'Body is required'
  }

  if (emailErrorRef.value.length || nameErrorRef.value.length) {
    return
  }

  emit('create', body)

  bodyRef.value = ''
}

watch(bodyRef, () => {
  if (bodyErrorRef.value.length) {
    bodyErrorRef.value = ''
  }
})
</script>

<template>
  <div class="content">
    <form @submit.prevent="handleSubmit(bodyRef)">
      <div class="field">
        <label class="label" for="comment-body">Write comment body</label>
        <div class="control">
          <textarea
            v-model="bodyRef"
            :class="{ 'is-danger': bodyErrorRef.length }"
            class="textarea"
            id="comment-body"
            name="body"
            placeholder="Comment"
          ></textarea>
        </div>

        <p v-if="bodyErrorRef.length" class="help is-danger">{{ bodyErrorRef }}</p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">Create</button>
        </div>

        <div class="control">
          <button @click="$emit('cancel')" type="reset" class="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>

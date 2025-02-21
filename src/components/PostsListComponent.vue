<script setup lang="ts">
import { type IPost } from '@/types/IPost'
import LoaderComponent from './LoaderComponent.vue'

const props = defineProps<{
  posts: IPost[]
  selectedPost: IPost | null
  isPostCreating: boolean
  isLoading: boolean
  postsError: string
}>()

const emit = defineEmits(['open', 'close', 'select'])

const handleSelectPost = (post: IPost) => {
  emit('select', post)
}

const handleUnselectPost = () => {
  emit('select', null)
}
</script>

<template>
  <div class="tile is-parent">
    <div class="tile is-child box is-success">
      <div class="block">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button
            @click="$emit('open')"
            :class="{ 'is-light': isPostCreating }"
            class="button is-link"
            type="button"
          >
            Add New Post
          </button>
        </div>

        <div v-if="isLoading" class="is-flex is-justify-content-center is-align-items-center mt-2">
          <LoaderComponent />
        </div>

        <template v-else>
          <h3 v-if="!posts.length && !postsError.length" class="mt-2 has-text-centered">
            No posts yet.
          </h3>
          <h3 v-else-if="postsError.length" class="mt-2 has-text-centered has-text-danger">
            {{ postsError }}
          </h3>
          <table v-else class="table is-fullwidth is-striped is-hoverable is-narrow">
            <thead>
              <tr class="has-background-link-light">
                <th>ID</th>
                <th>Title</th>
                <th class="has-text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="post of posts" :key="post.id">
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td class="has-text-right is-vcentered">
                  <button
                    v-if="selectedPost?.id === post.id"
                    @click="handleUnselectPost"
                    type="button"
                    class="button is-link"
                  >
                    Close
                  </button>
                  <button
                    v-else
                    @click="handleSelectPost(post)"
                    type="button"
                    class="button is-link is-light"
                  >
                    Open
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

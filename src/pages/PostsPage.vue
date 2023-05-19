<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type IPost } from '@/types/IPost'
import { type IPostCreation } from '@/types/IPostCreation'
import { getAuthData } from '@/utils/authStorage'
import { createPost, deletePost, getPosts, updatePost } from '@/services/postsService'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import PostsListComponent from '@/components/PostsListComponent.vue'
import AddPostComponent from '@/components/AddPostComponent.vue'
import PostPreviewComponent from '@/components/PostPreviewComponent.vue'

const { id: userId } = JSON.parse(getAuthData())

const posts = ref<IPost[]>([])
const selectedPost = ref<IPost | null>(null)
const isPostCreating = ref(false)
const isLoading = ref(false)
const postsError = ref('')

const loadPosts = async () => {
  isLoading.value = true

  try {
    const { data } = await getPosts(userId)

    posts.value = data
    isLoading.value = false
  } catch (e) {
    console.log(e)
    isLoading.value = false
    postsError.value = 'Failed to load data'
  }
}

onMounted(() => {
  loadPosts()
})

const handleCreatePost = async (post: IPostCreation) => {
  try {
    const { data } = await createPost(post)

    selectedPost.value = data
    posts.value = [...posts.value, data]
    isPostCreating.value = false
  } catch (e) {
    console.log(e)
  }
}

const handleUpdatePost = async (id: number, post: IPostCreation) => {
  try {
    const { data } = await updatePost(id, post)
    const postIndex = posts.value.findIndex((post) => post.id === id)

    posts.value[postIndex] = data
    selectedPost.value = data;
  } catch (e) {
    console.log(e)
  }
}

const handleDeletePost = async (id: number) => {
  try {
    await deletePost(id)

    selectedPost.value = null
    posts.value = posts.value.filter((post) => post.id !== id)
  } catch (e) {
    console.log(e)
  }
}

const handleShowCreatePostForm = () => {
  if (selectedPost.value) {
    selectedPost.value = null
  }

  isPostCreating.value = true
}

const handleSelectPost = (post: IPost) => {
  if (isPostCreating.value) {
    isPostCreating.value = false
  }

  selectedPost.value = post
}
</script>

<template>
  <HeaderComponent />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostsListComponent
          :posts="posts"
          :selectedPost="selectedPost"
          :isPostCreating="isPostCreating"
          :isLoading="isLoading"
          :postsError="postsError"
          @open="handleShowCreatePostForm"
          @select="handleSelectPost($event)"
        />

        <SidebarComponent :class="{ 'Sidebar--open': isPostCreating || selectedPost }">
          <PostPreviewComponent
            v-if="selectedPost"
            @edit="
              handleUpdatePost($event.id, {
                userId: $event.userId,
                title: $event.title,
                body: $event.body
              })
            "
            @remove="handleDeletePost($event)"
            :selectedPost="selectedPost"
          />

          <AddPostComponent
            v-else-if="isPostCreating"
            @close="isPostCreating = false"
            @create="
              handleCreatePost({
                userId,
                title: $event.title,
                body: $event.body
              })
            "
          />
        </SidebarComponent>
      </div>
    </div>
  </main>
</template>

<style></style>

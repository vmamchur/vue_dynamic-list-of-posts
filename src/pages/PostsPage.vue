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

const postsRef = ref<IPost[]>([])
const selectedPostRef = ref<IPost | null>(null)
const isPostCreatingRef = ref(false)
const isLoadingRef = ref(false)
const postsErrorRef = ref('')

const loadPosts = async () => {
  isLoadingRef.value = true

  try {
    const { data } = await getPosts(userId)

    postsRef.value = data
    isLoadingRef.value = false
  } catch (e) {
    console.log(e)
    isLoadingRef.value = false
    postsErrorRef.value = 'Failed to load posts'
  }
}

onMounted(() => {
  loadPosts()
})

const handleCreatePost = async (post: IPostCreation) => {
  try {
    const { data } = await createPost(post)

    selectedPostRef.value = data
    postsRef.value = [...postsRef.value, data]
    isPostCreatingRef.value = false
  } catch (e) {
    console.log(e)
  }
}

const handleUpdatePost = async (id: number, post: IPostCreation) => {
  try {
    const { data } = await updatePost(id, post)
    const postIndex = postsRef.value.findIndex((post) => post.id === id)

    postsRef.value[postIndex] = data
    selectedPostRef.value = data
  } catch (e) {
    console.log(e)
  }
}

const handleDeletePost = async (id: number) => {
  try {
    await deletePost(id)

    selectedPostRef.value = null
    postsRef.value = postsRef.value.filter((post) => post.id !== id)
  } catch (e) {
    console.log(e)
  }
}

const handleShowCreatePostForm = () => {
  if (selectedPostRef.value) {
    selectedPostRef.value = null
  }

  isPostCreatingRef.value = true
}

const handleSelectPost = (post: IPost) => {
  if (isPostCreatingRef.value) {
    isPostCreatingRef.value = false
  }

  selectedPostRef.value = post
}
</script>

<template>
  <HeaderComponent />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostsListComponent
          :posts="postsRef"
          :selectedPost="selectedPostRef"
          :isPostCreating="isPostCreatingRef"
          :isLoading="isLoadingRef"
          :postsError="postsErrorRef"
          @open="handleShowCreatePostForm"
          @select="handleSelectPost"
        />

        <SidebarComponent :class="{ 'Sidebar--open': isPostCreatingRef || selectedPostRef }">
          <PostPreviewComponent
            v-if="selectedPostRef"
            @edit="
              handleUpdatePost($event.id, {
                userId: $event.userId,
                title: $event.title,
                body: $event.body
              })
            "
            @remove="handleDeletePost"
            :selectedPost="selectedPostRef"
          />

          <AddPostComponent
            v-else-if="isPostCreatingRef"
            @close="isPostCreatingRef = false"
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

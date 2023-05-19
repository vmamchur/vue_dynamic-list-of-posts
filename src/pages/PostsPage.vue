<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type IPost } from '@/types/IPost'
import { type IPostCreation } from '@/types/IPostCreation'
import { getAuthData } from '@/utils/authStorage'
import { createPost, getPosts } from '@/services/postsService'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import PostsListComponent from '@/components/PostsListComponent.vue'
import AddPostComponent from '@/components/AddPostComponent.vue'

const { id: userId } = JSON.parse(getAuthData())

const posts = ref<IPost[]>([])
const isLoading = ref(false)
const postsError = ref('')
const isSidebarOpen = ref(false)

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
  await createPost(post)
  loadPosts();
}
</script>

<template>
  <HeaderComponent />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostsListComponent
          :posts="posts"
          :isLoading="isLoading"
          :postsError="postsError"
          @open="isSidebarOpen = true"
        />

        <SidebarComponent :class="{ 'Sidebar--open': isSidebarOpen }">
          <AddPostComponent
            @close="isSidebarOpen = false"
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

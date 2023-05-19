<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { type IPost } from '@/types/IPost'
import { getAuthData } from '@/utils/authStorage'
import { getPosts } from '@/services/postsService'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import PostsListComponent from '@/components/PostsListComponent.vue'
import AddPostComponent from '@/components/AddPostComponent.vue'

const { id: userId } = JSON.parse(getAuthData())

const posts = ref<IPost[]>([])
const isLoading = ref(false)
const postsError = ref('')
const isSidebarOpen = ref(false)

onMounted(async () => {
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
})
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
          <AddPostComponent @close="isSidebarOpen = false" />
        </SidebarComponent>
      </div>
    </div>
  </main>
</template>

<style></style>

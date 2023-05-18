<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import PostsListComponent from '@/components/PostsListComponent.vue'
import AddPostComponent from '@/components/AddPostComponent.vue'
</script>

<template>
  <HeaderComponent />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <PostsListComponent />

        <SidebarComponent :class="{ 'Sidebar--open': true }">
          <AddPostComponent />
        </SidebarComponent>
      </div>
    </div>
  </main>
</template>

<style></style>

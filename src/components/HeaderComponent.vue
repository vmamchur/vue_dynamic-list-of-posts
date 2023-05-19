<script setup lang="ts">
import { getAuthData, clearAuthData } from '@/utils/authStorage'

const { name } = JSON.parse(getAuthData())

const handleLogout = () => {
  clearAuthData()
}
</script>

<template>
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-item">
      <h2 className="is-size-4">Vue List Of Posts</h2>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <div className="mr-5 mb-2">
            <p>User: {{ name }}</p>
          </div>
          <router-link to="/sign-in" @click="handleLogout" className="button is-light"
            >Logout</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

import { register } from '@/services/authService'
import { saveAuthData } from '@/utils/authStorage'
import isValidEmail from '@/utils/isValidEmail'

const router = useRouter()

const emailRef = ref('')
const nameRef = ref('')
const emailErrorRef = ref('')
const nameErrorRef = ref('')

const handleRegister = async (email: string, name: string) => {
  if (!isValidEmail(email)) {
    emailErrorRef.value = 'Invalid email format'
  }

  if (!email.length) {
    emailErrorRef.value = 'Email is required'
  }

  if (name.length < 4) {
    nameErrorRef.value = 'Name must be at least 4 characters long'
  }

  if (!name.length) {
    nameErrorRef.value = 'Name is required'
  }

  if (emailErrorRef.value.length || nameErrorRef.value.length) {
    return
  }

  try {
    const { data } = await register(email, name)
    const registeredUser = data

    saveAuthData(registeredUser)
    router.push('/')
  } catch (e) {
    console.log(e)
    emailErrorRef.value = 'Something went wrong'
    nameErrorRef.value = 'Something went wrong'
  }
}

watch(emailRef, () => {
  if (emailErrorRef.value.length) {
    emailErrorRef.value = ''
  }
})

watch(nameRef, () => {
  if (nameErrorRef.value.length) {
    nameErrorRef.value = ''
  }
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <section class="container is-flex is-justify-content-center">
          <form @submit.prevent="handleRegister(emailRef, nameRef)" class="box mt-5">
            <h1 class="title is-3">Sign up</h1>

            <div class="field">
              <label class="label" htmlFor="user-email">Email</label>

              <div class="control has-icons-left">
                <input
                  v-model="emailRef"
                  :class="{ 'is-danger': emailErrorRef.length }"
                  class="input"
                  type="text"
                  id="user-email"
                  name="email"
                  placeholder="Enter your email"
                />

                <span class="icon is-small is-left">
                  <i class="fas fa-envelope" />
                </span>
              </div>

              <p v-if="emailErrorRef.length" class="help is-danger">{{ emailErrorRef }}</p>
            </div>

            <div class="field">
              <label class="label" htmlFor="user-name">Your Name</label>

              <div class="control has-icons-left">
                <input
                  v-model="nameRef"
                  :class="{ 'is-danger': nameErrorRef.length }"
                  class="input"
                  type="text"
                  id="user-name"
                  name="name"
                  placeholder="Enter your name"
                />

                <span class="icon is-small is-left">
                  <i class="fas fa-user" />
                </span>
              </div>

              <p v-if="nameErrorRef.length" class="help is-danger">{{ nameErrorRef }}</p>
            </div>

            <div class="field is-flex is-justify-content-space-between is-align-items-center">
              <button type="submit" class="button is-primary">Submit</button>
              <router-link to="/sign-in" class="has-text-primary">Sign in</router-link>
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>

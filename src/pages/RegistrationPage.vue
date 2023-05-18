<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

import { register } from '@/services/authService'
import { saveAuthData } from '@/utils/authStorage'
import isValidEmail from '@/utils/isValidEmail'

const router = useRouter()

const email = ref('')
const name = ref('')
const emailError = ref('')
const nameError = ref('')

const handleRegister = async (email: string, name: string) => {  
  if (!isValidEmail(email)) {
    emailError.value = 'Invalid email format'
  }

  if (!email.length) {
    emailError.value = 'Email is required'
  }

  if (name.length < 4) {
    nameError.value = 'Name must be at least 4 characters long'
  }

  if (!name.length) {
    nameError.value = 'Name is required'
  }

  if (emailError.value.length || nameError.value.length) {
    return
  }

  try {
    const { data } = await register(email, name)
    const registeredUser = data

    saveAuthData(registeredUser)
    router.push('/')
  } catch (e) {
    console.log(e)
    emailError.value = 'Something went wrong'
    nameError.value = 'Something went wrong'
  }
}

watch(email, () => {
  if (emailError.value.length) {
    emailError.value = ''
  }
})

watch(name, () => {
  if (nameError.value.length) {
    nameError.value = ''
  }
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <section class="container is-flex is-justify-content-center">
          <form @submit.prevent="handleRegister(email, name)" class="box mt-5">
            <h1 class="title is-3">Sign up</h1>

            <div class="field">
              <label class="label" htmlFor="user-email">Email</label>

              <div class="control has-icons-left">
                <input
                  v-model="email"
                  :class="{ 'is-danger': emailError.length }"
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

              <p v-if="emailError.length" class="help is-danger">{{ emailError }}</p>
            </div>

            <div class="field">
              <label class="label" htmlFor="user-name">Your Name</label>

              <div class="control has-icons-left">
                <input
                  v-model="name"
                  :class="{ 'is-danger': nameError.length }"
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

              <p v-if="nameError.length" class="help is-danger">{{ nameError }}</p>
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

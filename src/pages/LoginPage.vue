<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '@/services/authService'
import { saveAuthData } from '@/utils/authStorage'
import isValidEmail from '@/utils/isValidEmail'

const router = useRouter()

const email = ref('')
const emailError = ref('')

const handleLogin = async (email: string) => {
  if (!email.length) {
    emailError.value = 'Email is required'
    return
  }

  if (!isValidEmail(email)) {
    emailError.value = 'Invalid email format'
    return
  }

  try {
    const { data } = await login(email)
    const foundUser = data[0]

    if (foundUser) {
      saveAuthData(foundUser)
      router.push('/')
    } else {
      emailError.value = 'User not found'
    }
  } catch (e) {
    console.log(emailError)
    emailError.value = 'Something went wrong'
  }
}

watch(email, () => {
  if (emailError.value.length) {
    emailError.value = ''
  }
})
</script>

<template>
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <section class="container is-flex is-justify-content-center">
          <form @submit.prevent="handleLogin(email)" class="box mt-5">
            <h1 class="title is-3">Sign in</h1>

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
            
            <div class="field is-flex is-justify-content-space-between is-align-items-center">
              <button type="submit" class="button is-primary">Submit</button>
              <router-link to="/sign-up" class="has-text-primary">Sign up</router-link>
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>

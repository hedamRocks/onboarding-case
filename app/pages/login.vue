<script setup lang="ts">
import type { LoginContent } from '~/types/Content'

definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const { login } = useAuth()

const { getContentByType } = useContent()
const content = await getContentByType('login') as LoginContent

async function handleLogin() {
  try {
    errorMessage.value = ''
    await login(email.value, password.value)
    // Redirect to home or dashboard
    await navigateTo('/')
  } catch (error: any) {
    errorMessage.value = error.message || 'Login failed'
    console.error('Login error:', error)
  }
}
</script>
<template>
  <div class="containe max-w-[450px]">
    <h1 class="text-5xl animate-slide-up animation-delay-150">{{ content?.title }}</h1>
    <h3 class="animate-slide-up animation-delay-200">{{ content?.description }}</h3>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-10">
      <div class="flex flex-col gap-6">
        <div class="animate-slide-up animation-delay-300">
          <BaseInput
            id="email"
            is-required
            v-model="email"
            :label="content?.emailLabel"
            required
          />
        </div>
        <div class="animate-slide-up animation-delay-500">
          <BaseInput
            id="password"
            type="password"
            is-required
            v-model="password"
            :label="content?.passwordLabel"
            required
          />
        </div>
        <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>
      </div>
      <div class="flex flex-col gap-4 animate-slide-up animation-delay-600">
        <BaseButton type="primary">{{ content?.loginButtonText }}</BaseButton>
        <a href="#">{{ content?.forgotPasswordText }}</a>
      </div>
    </form>
  </div>
</template>
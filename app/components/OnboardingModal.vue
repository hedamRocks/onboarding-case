<script setup lang="ts">
import type { OnboardingContent } from '~/types/Content'

/**
 * Onboarding modal component
 * This modal only triggers once the user logs in for the first time
 */
const { markOnboarded } = useAuth()
const { reset, setOnboardingStepsCount } = useOnboarding()
const { getContentByType } = useContent()
const showModal = ref(false)
const content = await getContentByType('onboarding') as OnboardingContent
setOnboardingStepsCount(content?.steps.length || 0)

// Fetch onboarding content
onMounted(async () => {
  setTimeout(() => {
    showModal.value = true
  }, 1000)
})

function closeModal() {
  showModal.value = false
  markOnboarded()
  reset()
}
</script>
<template>
  <transition name="fade-in">
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-12 shadow-lg max-w-[896px] max-h-[80%] overflow-auto w-full animate-slide-up animation-delay-100">
        <h2 class="animate-slide-up animation-delay-200">{{ content?.title }}</h2>
        <p class="mb-6 animate-slide-up animation-delay-300">{{ content?.description }}</p>
        <div class="mt-10 mb-5 py-10 px-12 border-t border-b border-clever-extralight">
          <!-- TODO: Fix this!!!!! - <TransitionGroup name="fade-in" mode="out-in"> -->
            <OnboardingModalStep v-for="(step, index) in content?.steps" :key="`step-${index}`" :step="step" :step-index="index" />
          <!-- </TransitionGroup> -->
        </div>
        <OnboardingModalNavigation @close="closeModal" />
      </div>
    </div>
  </transition>
</template>
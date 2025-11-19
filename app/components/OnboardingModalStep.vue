<script setup lang="ts">
const {currentStep} = useOnboarding()
defineProps<{
  stepIndex: number
  step: {
    title: string
    content: string
    imageUrl?: string
  }
}>()
</script>
<template>
    <div class="flex flex-col gap-6 lg:flex-row items-center" v-if="currentStep === stepIndex">
      <img 
        v-if="step.imageUrl" 
        :src="step.imageUrl" 
        :alt="`${step.title} image`" 
        class="w-full h-auto max-w-[316px] rounded animate-slide-up animation-delay-500"
      />
      <div class="animate-slide-up animation-delay-600">
        <h3 class="">{{ step.title }}</h3>
        <div class="onboarding-content" v-html="step.content"></div>
      </div>
    </div>
</template>
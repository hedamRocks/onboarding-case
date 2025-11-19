<script setup lang="ts">
import type { OnboardingContent } from '~/types/Content';
import BaseButton from './BaseButton.vue';

const {currentStep, isFirstStep, isLastStep, nextStep, prevStep} = useOnboarding()
const { getContentByType } = useContent()
const content = await getContentByType('onboarding') as OnboardingContent
const stepCount = computed(() => content?.steps.length || 0)

defineEmits<{
  (e: 'close'): void;
}>();
</script>
<template>
  <div class="animate-slide-up animation-delay-500">
    <div class="flex justify-center mb-14 space-x-2">
      <div class="size-2 rounded-full" v-for="(dot, index) in stepCount" :key="`dot-${index}`" :class="index === currentStep ? 'bg-clever-dark' : 'bg-clever-light'"></div>
    </div>
    <div class="flex flex-row justify-between">
      <div>
        <a
          href="#"
          @click="$emit('close')"
        >{{ content?.skipButtonText }}</a>
      </div>
      <div class="flex gap-4">
        <BaseButton
          v-if="!isFirstStep"
          type="ghost"
          @click="prevStep()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.9998 12H3.2998" stroke="#003732" stroke-miterlimit="10"/>
            <path d="M10.4998 19.2L3.2998 12L10.4998 4.80005" stroke="#003732" stroke-miterlimit="10"/>
          </svg> {{ content?.prevButtonText }}
        </BaseButton>
        <BaseButton
          type="primary"
          v-if="!isLastStep"
          @click="nextStep()"
        >
          {{ content?.nextButtonText }}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.1501 12.1499L20.8501 12.1499" stroke="white" stroke-miterlimit="10"/>
            <path d="M13.6501 4.9501L20.8501 12.1501L13.6501 19.3501" stroke="white" stroke-miterlimit="10"/>
          </svg>
        </BaseButton>
        <BaseButton
          v-else
          type="primary"
          @click="$emit('close')"
        >{{ content?.finishButtonText }}</BaseButton>
      </div>
    </div>
  </div>
</template>
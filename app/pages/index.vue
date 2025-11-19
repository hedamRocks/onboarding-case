<script setup lang="ts">
const { logout, isUserOnboarded, clearOnboarding } = useAuth()
// If this is the firest login, show onboarding modal

const showOnboarding = ref(false)
if (isUserOnboarded.value === false) {
    showOnboarding.value = true
}

</script>
<template>
    <div class="index-page container p-16 mx-auto">
        <div class="absolute top-2 left-2 flex space-x-2">
            <BaseButton type="primary" @click="logout">Logout</BaseButton>
            <BaseButton type="ghost" @click="clearOnboarding">Clear Onboarding</BaseButton>
        </div>
        <OnboardingModal v-if="showOnboarding" />
    </div>
</template>
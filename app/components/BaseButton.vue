<script setup lang="ts">
    const { type } = defineProps<{
        type: 'primary' | 'ghost'
    }>();

    const buttonTypeClasses = computed(() => {
        return type === 'primary'
            ? 'bg-clever-dark border border-clever-dark text-white hover:bg-clever-medium hover:border-clever-medium'
            : 'border border-clever-dark text-clever-dark hover:bg-clever-light';
    });
</script>
<template>
    <button
        :class="buttonTypeClasses"
        class="px-4 py-2.5 max-w-max text-sm transition-colors duration-200 box-border flex gap-2 items-center justify-center"
    >
        <slot />
    </button>
</template>
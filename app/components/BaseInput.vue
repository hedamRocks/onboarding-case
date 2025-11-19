<script setup lang="ts">
    // Props
    const { label, isRequired, modelValue } = defineProps<{
        modelValue: string
        id: string
        isRequired?: boolean
        type?: string
        label?: string
    }>();

    // Emits
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()

    // Handlers
    function onInput(event: Event) {
        const target = event.target as HTMLInputElement
        emit('update:modelValue', target.value)
    }

    const labelWithRequired = computed(() => {
        return isRequired ? `${label} *` : label
    })

    // Only show label if input has value
    const showLabel = computed(() => {
        return modelValue.length > 0
    })

</script>
<template>
    <div class="relative">
        <Transition name="fade-y">
            <label v-if="label && showLabel" :for="id" class="absolute bg-white top-0 left-3 -translate-y-1/2 px-1 text-[11px] text-clever-medium">{{ labelWithRequired }}</label>
        </Transition>
        <input
            :type="type || 'text'"
            :id="id"
            :placeholder="labelWithRequired || ''"
            :value="modelValue"
            @input="onInput"
            class=" px-4 py-3.5 w-full text-sm text-clever-dark border border-clever-medium focus:outline-none placeholder:text-clever-medium"
        />
    </div>
</template>
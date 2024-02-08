<script setup>


defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});


</script>

<template>
    <button :type="type" class="rounded-md border border-transparent bg-sky-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
        <slot />
    </button>
</template>

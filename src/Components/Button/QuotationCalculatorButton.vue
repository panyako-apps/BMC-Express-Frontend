
<script setup>
import Link from '@/Components/links/Link.vue';
</script>

<template>
    <div class="container mx-auto text-center">
        <h1 class="uppercase font-bold text-blue-900 text-2xl mb-2">Try Our <span class="text-red-600">Free Quotations Calculator.</span> </h1>
        <Link :href="'/'" :asButton="true" :classes="'rounded-full py-2 px-5'">
            Quick Project Quotation
        </Link>
    </div>
</template>

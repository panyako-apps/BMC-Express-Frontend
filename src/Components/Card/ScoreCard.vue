<template>
    <div class="flex gap-2 mb-2 items-center py-">
        <div class="flex items-center justify-end gap-1  bg-slate-200 shadow-md rounded-full p-1 pl-6">
            <div class="">
                <span class="my-auto text-teal-800 font-bold">
                    T-Area Wazee FC
                </span>
            </div>
            <div class="rounded-full h-10 w-10 bg-red-500 flex justify-center items-center">
                <span class="text-teal-50 font-bold">5</span>
            </div>
        </div>
        <div class="text-teal-800 ">
            <span class="font-bold">Vs.</span>
        </div>
        <div class="flex items-center gap-1 justify-start bg-slate-200 shadow-md rounded-full p-1 pr-6">
            <div class="rounded-full h-10 w-10 bg-red-500 flex justify-center items-center">
                <span class="text-teal-50 font-bold">3</span>
            </div>
            <div class="">
                <span class="my-auto text-teal-800 font-bold">
                    Rangers FC
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    hometeam: {
        type: Object,
    }
})
</script>

<style>

</style>
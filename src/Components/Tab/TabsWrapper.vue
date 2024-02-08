<template>
  <div class="">
    <ul class="flex gap-2 mb-3">
        <li v-for="tabTitle in tabTitles" 
        :key="tabTitle"
        @click="selectedTitle = tabTitle"
        class="rounded-full border border-transparent bg-slate-200 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm hover:bg-teal-600 hover:text-white cursor-pointer"
        :class="selectedTitle == tabTitle ? 'bg-teal-600 text-white' : ''"
        >
        {{tabTitle}}
        </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>

import { ref, provide } from 'vue';

export default {
    setup(props, {slots}){
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])

        // const horizontalClasses = ref('flex gap-2')

        provide("selectedTitle", selectedTitle)

        return {
            tabTitles,
            selectedTitle,
        }
    },
}
</script>

<style>

</style>
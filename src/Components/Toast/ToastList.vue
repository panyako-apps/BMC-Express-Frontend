<script setup>

import { router } from '@inertiajs/vue3'

import { ref } from '@vue/reactivity';
import { usePage } from '@inertiajs/vue3';
import { onUnmounted } from '@vue/runtime-core';
import ToastListItem from './ToastListItem.vue';
import toast from '@/Composables/Stores/toast';

const remove = (index) => {
    toast.remove(index)
}

const page =usePage()

let removeFinishEventListener = router.on('finish', ()=>{
    if(page.props.value.flash.success != null || page.props.value.flash.error != null)
    {
        if(page.props.value.flash.success){
            toast.add({
                message: page.props.value.flash.success
            })
        }
    
        else{
            toast.add({
                message: page.props.value.flash.error 
            })
        }

    }
})

onUnmounted(()=>removeFinishEventListener());

</script>


<template>
    <TransitionGroup 
    
    tag="div"
    enter-from-class="translate-x-full opacity-0"
    enter-active-class="duration-500"
    leave-active-class="duration-500"
    leave-to-class="translate-x-full opacity-0"

    class="fixed top-32 right-4 z-50 space-y-3 max-w-xs">
        <ToastListItem 
                v-for="(item, index) in toast.items" 
                :key="item.key" 
                :message="item.message"
                :duration="8000"
                @remove="remove(index)"
                />
    </TransitionGroup>
</template>


<style>

</style>
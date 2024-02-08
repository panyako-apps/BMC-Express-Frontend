<template>
      <nuxt-link :to="'/'" class="h-16 w-24 flex items-center justify-center border-b-4 border-b-transparent hover:border-b-slate-300">
            <span class="p-3 rounded-md  hover:bg-teal-100 flex items-center justify-center">
                <slot v-if="props.icon" name="icon">{{props.icon}}</slot>
                <slot v-if="props.label" name="label">{{props.label}}</slot>
            </span> 
        </nuxt-link>
</template>

<script>
const props = defineProps({
    label: String,
    icon: String,
    url: String, 
})

const router = useRouter();
const activeClasses = '';

const isActive = computed(()=>{
    return router.currentRoute.url == props.url
})
</script>

<style>

</style>
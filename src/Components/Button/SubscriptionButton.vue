<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import Modal from '@/Components/Modal.vue'
import axios from 'axios';

const props = defineProps({
    subscribeable_type: String,
    subscribeable_id: String,
});

const emits = defineEmits([
    'subscribed'
])

const subscriptions = ref([]);
const user = usePage().props.auth.user.data;

const form = useForm({
    subscribeable_id: props.subscribeable_id,
    subscribeable_type: props.subscribeable_type,
    user_id: user.id,
});

const submit = async () =>{
    if(user){
        const res = await axios.post(route('api.subscribe'), {
            subscribeable_id: form.subscribeable_id, 
            subscribeable_type:form.subscribeable_type,
            user_id: form.user_id
        })

        if(res.data.status === 200)
        {
            await fetchSubscriptions();
            emits('subscribed', subscriptions.value);   
        }
    }
    else{
        return;
    }
    
}

const fetchSubscriptions = async ()=>{
    const fetchedSubscriptions = await axios.post(route('api.subscriptions'),{
            subscribeable_id: form.subscribeable_id,
            subscribeable_type: form.subscribeable_type
        });
    subscriptions.value = fetchedSubscriptions.data.data;
}

onMounted(async ()=>{
    await fetchSubscriptions();
});


const subscribed = computed(()=>{
    if(user&&subscriptions.value.length>0){
        return subscriptions.value.map(subscription => subscription.user_id).includes(user.id);
    }
});


</script>

<template>
    <button
        @click="submit()"
        class="text-lg text-white"
        >
        <span v-if="subscribed" class="">
            <font-awesome-icon icon="fa-bell"></font-awesome-icon>
            Subscribed.
        </span>
        <span v-else>Subscribe</span>
        
    </button>

</template>



<style>

</style>



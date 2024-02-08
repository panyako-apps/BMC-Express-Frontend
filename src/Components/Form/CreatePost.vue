<script setup>
import { computed, ref } from "vue";
import Modal from "@/Components/Modal.vue"
import { useForm } from "@inertiajs/vue3";

const props = defineProps({
    trigger: String,
    league: Object,
    team: Object,
    text: String
});


const show = ref(false);
const toggleModal = () =>{
    show.value = !show.value
}

const form = useForm({
    body: '',
    images: null,
    league_id: props.league ? props.league.id : null,
    team_id: props.team ? props.team.id : null,
});

const isPosting = ref(false);

const submit = () =>{
    
    try {
        form.post(route('post.store'), {
                onProgress: ()=>{
                    isPosting.value = true;
                },
                onSuccess: ()=>{
                    isPosting.value = false;
                    toggleModal();
                    
                },
                preserveScroll: true
            })
        } 

    catch (error) 
        {
        console.log(error)
        }


}

const btnText = computed(()=>{
    if(props.text){
        return props.text
    }
    else {
        return "What's Happening"
    }
})

const isReadyToSubmit = computed(()=>form.body || form.images);

</script>


<template>
  <div class="p-4 bg-white rounded-xl shadow">
    <div class="flex items-center gap-2 mb-4">
        <div class="h-14 w-14 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
            <img :src="$page.props.auth.user.data.profile.profileimage" alt="" class="h-full w-full object-cover">
        </div>
        <div class="grow" >
            
            <button  v-if="props.trigger"
                type="button" 
                @click="toggleModal"
                v-html="props.trigger"
                ></button>
            <button v-else
                type="button" 
                class="w-full rounded-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 cursor-pointer text-left text-slate-500"
                @click="toggleModal"
                >{{form.body ? form.body.slice(0,80) : btnText}} {{form.body.length > 80 ? '...':''}}</button>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
        <button class="w-full hover:bg-slate-200 rounded-md px-4 py-2">
            Live Video
        </button>
        <button class="w-full hover:bg-slate-200 rounded-md px-4 py-2">Image / Video</button>
    </div>

    <Modal :show="show" :closeable="true" :max-width="'xl'">
        <template #header>
            <div class="text-center h-12 relative rounded-md bg-slate-100">
                <h4 class="text-xl text-teal-600 font-bold flex items-center justify-center h-full">Create Post</h4>
                <button @click="toggleModal" class="absolute -translate-y-[50%] top-[50%] right-4 text-2xl ">
                    <span class="text-red-700 hover:text-red-600">
                        <font-awesome-icon icon="fa-close"></font-awesome-icon>
                    </span>
                </button>
            </div>
        </template>

        <div class="px-6 py-4 rounded-md bg-white ">

            <div class="flex items-center justify-between gap-2 mb-4">
                <div class="flex items-center gap-2">
                    <div class="h-14 w-14 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
                        <img :src="$page.props.auth.user.data.profile.profileimage" alt="" class="h-full w-full object-cover">
                    </div>
                    <div class="flex items-center gap-1">
                        <p v-if="props.league || props.team">Post In: </p>
                        <span v-if="props.league" class="bg-slate-200 rounded-md px-2 py-1 text-teal-600">{{props.league.name}}</span>
                        <span v-if="props.team" class="bg-slate-200 rounded-md px-2 py-1 text-teal-600">{{props.team.name}}</span>
                        
                    </div>
                </div>
                <div class="flex items-center justify-end">
                    <p class="bg-teal-600 rounded-l-md px-2 py-1 border border-teal-600 text-white"><font-awesome-icon icon="fa-eye"></font-awesome-icon> </p>
                    <select name="" id="" class="bg-slate-200 rounded-r-md px-2 py-1 border-slate-200">
                        <option value="">Public</option>
                        <option value="">Followers</option>
                        <option value="">Players</option>
                    </select>
                </div>
            </div>
            <form @submit.prevent="submit" id="new-post">
                <textarea name="" id="" cols="30" rows="5" v-model="form.body" class="p-4 bg-slate-50 rounded-xl border border-slate-300 w-full focus:outline-teal-600 mb-4"></textarea>

                <div class="flex items-center justify-between gap-4 rounded-xl border px-4 py-2">
                    <p class="text-slate-600">Enhance Your Post</p>
                    <div class="flex items-center gap-2">
                        <div class="">
                            <label for="images" class="w-12 h-8 shrink-0 bg-slate-200 hover:bg-slate-300 cursor-pointer text-teal-600 rounded-full flex items-center justify-center ">
                                <font-awesome-icon icon="fa-images"></font-awesome-icon>
                            </label>
                            <input 
                                class="hidden"
                                type="file" 
                                id="images"
                                @input="form.images = $event.target.files" 
                                multiple
                            >
                        </div>

                        <span class="w-12 h-8 shrink-0 bg-slate-200 hover:bg-slate-300 cursor-pointer text-teal-600 rounded-full flex items-center justify-center ">
                            <font-awesome-icon icon="fa-video"></font-awesome-icon>
                        </span>
                    </div>
                </div>
            </form>
        </div>
        <template #footer>
            <div class="px-6 pb-4">
                <button type="submit" form="new-post" 
                    :class="isReadyToSubmit ? 'bg-teal-600 text-white' : 'bg-slate-300'"
                    class="shadow rounded-md w-full px-4 py-1.5 text-slate-500 transition-all duration-350 ease-in-out"
                    :disabled="!isReadyToSubmit"
                
                >Post</button>
            </div>
        </template>
    </Modal>
  </div>
</template>


<style>

</style>
<template>
       <div class="bg-gray-200 rounded sm:rounded-2xl mb-3 p-4">

            <div class="mx-auto h-14 w-14 lg:h-28 lg:w-28 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
                <!-- <Link :href="route('', $page.auth.user.id)" class="">

                    <img v-if="$page.auth.user.userProfile.image" :src="'storage/userprofiles'+$page.auth.user.userProfile.image" :alt="$page.auth.user.userProfile.image" class="h-full w-full object-cover">
                    <img v-else :src="'storage/globals/avatar1.jpg'" alt="" class="h-full w-full object-cover">
                    
                </Link>   -->
                <img src="../assets/images/panyako.jpg" alt="" class="h-full w-full object-cover">
            </div>

            <div v-if="authStore.user" class="text-center mb-5">
                <h4 class="font-bold m-0 text-xl cursor-pointer">{{ authStore.user.name }}</h4>  
                <small class="flex justify-center items-center gap-1">Pro Player 
                    <span class="text-teal-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                </span>
                </small>
            </div>
            <div class="flex justify-center gap-2">
                <button class="rounded-full border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">Message</button>
                <button class="rounded-full border border-transparent bg-teal-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">Posts</button>
            </div>
        </div>

        <hr class="w-1/2 mx-auto my-3 border-teal-400">
</template>

<script>

</script>

<style>

</style>
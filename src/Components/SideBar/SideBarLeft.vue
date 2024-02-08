<template>
    <div ref="leftSidebar" class="transition-all delay-200 ease-in-out  sticky top-20">
        <div class="h-screen">
      
            <div class="">
                <ul class="">
                    <Link href="">
                        <li class="font-bold flex gap-2 mb-4 group cursor-pointer hover:bg-slate-200 rounded-full transition-all duration-200 ease-in-out">
                            <div class="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer group-hover:bg-teal-700 group-hover:text-slate-100 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </div> 
                            <span class="my-auto text-teal-800">New Post</span>
                        </li>
                    </Link>
                    <li class="font-bold flex gap-2 mb-4 group cursor-pointer hover:bg-slate-200 rounded-full transition-all duration-200 ease-in-out">
                        <div class="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer group-hover:bg-teal-700 group-hover:text-slate-100 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div> 
                        <span class="my-auto group-hover:text-teal-700 cursor-pointer">Watch</span>
                    </li>
                    <li class="font-bold flex gap-2 mb-4 group cursor-pointer hover:bg-slate-200 rounded-full transition-all duration-200 ease-in-out">
                        <div class="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer group-hover:bg-teal-700 group-hover:text-slate-100 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            
                        </div> 
                        <span class="my-auto group-hover:text-teal-700 cursor-pointer">Latests Scores</span>
                    </li>
                    <li class="font-bold flex gap-2 mb-4 group cursor-pointer hover:bg-slate-200 rounded-full transition-all duration-200 ease-in-out">
                        <div class="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer group-hover:bg-teal-700 group-hover:text-slate-100 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            
                        </div> 
                        <span class="my-auto group-hover:text-teal-700 cursor-pointer">Saved</span>
                    </li>
                    <li class="font-bold flex gap-2 mb-4 group cursor-pointer hover:bg-slate-200 rounded-full transition-all duration-200 ease-in-out">
                        <div class="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer group-hover:bg-teal-700 group-hover:text-slate-100 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/>
                            </svg>    
                        </div> 
                        <span class="my-auto group-hover:text-teal-700 cursor-pointer">Events</span>
                    </li>
                    <li class="font-bold flex gap-2 mb-4 group cursor-pointer hover:bg-slate-200 rounded-full transition-all duration-200 ease-in-out">
                        <div class="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer group-hover:bg-teal-700 group-hover:text-slate-100 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"/></svg>                        </div> 
                        <span class="my-auto group-hover:text-teal-700 cursor-pointer">Messenger</span>
                    </li>
                </ul>
            </div>

            <hr class="w-1/2 mx-auto my-3 border-teal-400">

            <div class="p-2">
                <h5 class="font-bold mb-3">Suggested For You</h5>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-200 rounded-xl h-36">

                    </div>
                    <div class="bg-slate-200 rounded-xl h-36">

                    </div>
                    <div class="bg-slate-200 rounded-xl h-36">

                    </div>
                    <div class="bg-slate-200 rounded-xl h-36">

                    </div>
                </div>

            </div>

            
        </div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";

</script>

<style>


</style>
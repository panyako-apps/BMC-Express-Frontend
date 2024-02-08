<template>
  <div class="container rounded-md">
    <div class="circular-progress">
      <p class="progress-value text-blue-600 text-2xl font-bold">{{ counter }}%</p>
    </div>
    <p class="text-slate-500 font-bold uppercase">Project Progress</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  progressEndValue:{
    type: Number,
    default: 90
  }, 
  progressHeight: {
    type: String, 
    default: '160px'
  },
  progressWidth: {
    type: String, 
    default: '160px'
  },
  progressInnerHeight: {
    type: String, 
    default: '120px'
  },
  progressInnerWidth: {
    type: String, 
    default: '120px'
  }
})

let counter = ref(0);
const bgstyle =ref(null);

onMounted(()=>{
  let progress = setInterval(
    ()=>{
      counter.value++;
    
      bgstyle.value = `conic-gradient(#2563eb ${counter.value * 3.6}deg, #ededed 0deg)`;
      
          if(counter.value ===props.progressEndValue)
          {
            clearInterval(progress);
          }
    
        }, 
        100);
})

</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
        width: 100%;
    }

    .circular-progress
    {
        position: relative;
        height: v-bind(progressWidth);
        width: v-bind(progressWidth);
        background-color: #f0ff;
        border-radius: 50%;
        background: v-bind(bgstyle);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .circular-progress::before{
      content: '';
      position: absolute;
      height: v-bind(progressInnerWidth);
        width: v-bind(progressInnerWidth);
      border-radius: 50%;
      background-color: #fff;
    }

    .progress-value {
      position: relative;
    }
</style>
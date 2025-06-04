<template>
    <div class="toggle-switch" @click="toggle">
      <div class="track" :class="{ active: isOn }">
        <div class="thumb" :class="{ active: isOn }"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean,
  })
  const emit = defineEmits(['update:modelValue'])
  
  const isOn = computed(() => props.modelValue)
  
  const toggle = () => {
    emit('update:modelValue', !props.modelValue)
  }
  </script>
  
  <style scoped>
  .toggle-switch {
    width: 44px;
    height: 24px;
    cursor: pointer;
  }
  .track {
    background-color: #ccc;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s;
    position: relative;
  }
  .track.active {
    background-color: #369870;
  }
  .thumb {
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: left 0.3s;
  }
  .thumb.active {
    left: 23px;
  }
  </style>
  
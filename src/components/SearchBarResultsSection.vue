<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <transition name="fade">
        <div class="section">
            <h3 class="section-title">{{ title }}</h3>
            <slot name="content"></slot>
            <div class="section-separator"></div>
        </div>
    </transition>
</template>
  
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .section-title {
        font-weight: bold;
        color: var(--color);
        text-transform: uppercase;
        padding-left: 10px;
        padding-top: 5px;
    }
    
    .section-separator {
        height: 1px;
        background-color: #ccc;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
  
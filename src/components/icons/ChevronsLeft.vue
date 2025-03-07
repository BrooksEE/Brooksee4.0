<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" class="left" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
</template>
<style scoped>
    .left {
        stroke: var(--color1);
        padding-bottom: 2px;
        transition: transform 0.3s ease;
    }

    .left.open {
        transform: rotate(90deg);
    }
</style>
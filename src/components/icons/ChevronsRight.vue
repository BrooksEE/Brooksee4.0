<template>
<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" class="right" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg></template>
<style scoped>
    .right {
        stroke: var(--color1);
        padding-bottom: 2px;
        transition: transform 0.3s ease;
    }

    .right.open {
        transform: rotate(180deg);
    }
</style>
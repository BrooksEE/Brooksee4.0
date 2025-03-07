<script setup lang="ts">
    import SearchBar from "@/components/TheSearchBar.vue";
</script>
<template>
    <header>
        <div class="logo-container">
            <a href="/">
                <img src="https://brookseeevents.s3.amazonaws.com/bee/2025/albums/BrookseeLogo-Horizontal-Color%20%281%29_web.png"
                    alt="logo" 
                    class="logo"
                />
            </a>
        </div>

        <div class="search-bar-container">
            <SearchBar />
        </div>
    </header>

    <div class="separator"></div>
</template>
<style scoped>
    header {
        display: flex;
        align-items: center;
        height: 10vh;
        width: 100vw;
        padding: 20px 10px;
        position: relative;
        background-image: url(https://brookseeevents.s3.amazonaws.com/bee/2023/albums/Brooksee%20Icon%20Pattern3_web.png);
        background-size: cover;
        background-repeat: no-repeat;
    }
    .logo {
        height: 25px;
    }
    .logo-container {
        flex-shrink: 0;
        position: absolute;
        left: 20px;
        margin-right: 20px;
    }
    .search-bar-container {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        padding: 0 10px;
    }
    .separator {
        width: 100%;
        border-bottom: 1px solid var(--separator-color);
    }
</style>
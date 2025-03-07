<script setup lang="ts">
    import SearchBarResultsSection from './SearchBarResultsSection.vue';
    const recents = [
        {
            src:"https://brookseeevents.s3.amazonaws.com/rag/2024/albums/Logo_Horizontal%20Orange_web.png",
            title: "Ragnar"
        }, 
        {
            src:"https://brookseeevents.s3.amazonaws.com/phx/2025/albums/PhoenixMarathonLogo_HorizontalStacked_Color1_web.png",
            title: "Phoenix Marathon"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/vrz/2025/albums/2025%20Zion%20Half%20Shield_web.png",
            title: "Zion Half"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/des/2022/albums/Deseret%20Marathon-03_web.png",
            title: "Deseret News Marathon"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/lvm/2024/albums/Final%20Logo-01_web.jpg",
            title: "Las Vegas Marathon"
        }
    ]
</script>

<template>
    <transition name="fade">
        <SearchBarResultsSection :title="'Recents'">
            <template #content>
                <div class="recent-list">
                    <template 
                        v-for="(item, idx) in recents" 
                        :key="idx" 
                    >
                        <a class="recent-item">
                            <img 
                                :src="item.src" 
                                class="icon"
                            />
                            <p class="recent-title">{{ item.title }}</p>
                        </a>
                    </template>
                </div>
            </template>
        </SearchBarResultsSection>
    </transition>
</template>

<style scoped>

    .recent-list {
        display: flex;
        gap: 10px;
        padding: 0 10px 0 0;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .recent-item {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 5px;
        align-items: center;
        transition: all 0.2s ease-in-out;
    }
    .recent-title {
        font-size: 12px;
    }
    .icon {
        width: 60px;
        height: 30px;
        object-fit: contain;
        background-color: white;
        border-radius: 5px;
    }

    @media(hover: hover){
        .recent-item:hover {
            position: relative;
            top: -3px;
            border-color: rgba(0, 0, 0, 0.1);
        }
    }
</style>
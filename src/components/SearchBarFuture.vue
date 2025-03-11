<script setup lang="ts">
    import SearchBarResultsSection from './SearchBarResultsSection.vue';
    const future = [
        {
            src:"https://brookseeevents.s3.amazonaws.com/rwm/2024/albums/RWM-LogoColor_V4_web.png",
            title: "REVEL White Mountains",
        }, 
        {
            src:"https://cdn.saffire.com/theme-files/OgdenMarathon/App_Themes/OgdenMarathon/images/logo.png",
            title: "Ogden Marathon"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/rmc/2022/albums/22-RMC_WebIcon_V2_web.png",
            title: "REVEL Mt Charleston"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/ele/2024/albums/EE2024%20logo_web.png",
            title: "Elevation Everest"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/pdx/2024/albums/Portland%20Marathon%20Logo-01_web.png",
            title: "Portland Marathon"
        }
    ]
</script>

<template>
    <SearchBarResultsSection :title="'Future'">
        <template #content>
            <div class="recent-list">
                <template 
                    v-for="(item, idx) in future" 
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

    @media screen only and (max-width: 1180px) {
        .recent-list {
            gap: 5px;
            padding: 0;
            justify-content: center;
        }
    }
</style>
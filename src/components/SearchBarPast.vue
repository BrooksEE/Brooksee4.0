<script setup lang="ts">
    import SearchBarResultsSection from './SearchBarResultsSection.vue';
    const past = [
        {
            src:"https://brookseeevents.s3.amazonaws.com/spd/2025/albums/shopping_cart_icon_web.png",
            title: "Spudman",
        }, 
        {
            src:"https://brookseeevents.s3.amazonaws.com/stg/2024/albums/1a59bbb479331b7503154c7fe66635d00ca1a13f_web.png",
            title: "St. George Marathon"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/tou/2023/albums/toputcolor_web.jpg",
            title: "Top of Utah"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/lpw/2024/albums/lake_powell_web-removebg-preview_web.png",
            title: "Vaction Races | Lake Powell"
        },
        {
            src:"https://brookseeevents.s3.amazonaws.com/wep/2023/albums/WE%20%2B%20CSE%20Logo_web.png",
            title: "Women's Epic Brian Head"
        }
    ]
</script>

<template>
    <SearchBarResultsSection :title="'Past'">
        <template #content>
            <div class="recent-list">
                <template 
                    v-for="(item, idx) in past" 
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
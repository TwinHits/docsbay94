<template>
    <v-app app>
        <TopNavBar />
        <v-main>
            <v-container id="app" fluid>
                <router-view />
            </v-container>
        </v-main>
        <BottomNavBar />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import BottomNavBar from '@/components/navigation/BottomNavBar.vue';
import TopNavBar from '@/components/navigation/TopNavBar.vue';

export default Vue.extend({
    components: {
        BottomNavBar,
        TopNavBar,
    },
});
</script>

<style lang="scss">
@import '@/styles/colors.scss';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: $background-black;
    width: 100%;
    height: 100%;
}

body {
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>

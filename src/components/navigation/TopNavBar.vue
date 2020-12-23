<template>
    <v-app-bar elevation="2" dense :color="color" app>
        <v-app-bar-nav-icon><v-img src="@/assets/logo_icon_32x32.png"/></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

import * as Constants from '@/common/constants';

export default Vue.extend({
    data() {
        return {
            color: Constants.COLORS.BACKGROUND_GREY as string,
        };
    },
});
</script>

<style scoped lang="scss"></style>

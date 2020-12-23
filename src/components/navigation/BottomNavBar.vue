<template>
    <v-footer elevation="2" :color="color">
        <v-row>
            <v-col> {{ new Date().getFullYear() }} — <strong>TIEngine</strong> </v-col>
        </v-row>
    </v-footer>
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

<style scoped></style>

<template>
    <v-alert class="error-alert" border="left" dismissible elevation="2" :color="color">
        {{ message }}
    </v-alert>
</template>

<script lang="ts">
import Vue from 'vue';

import * as Constants from '@/common/constants';

export default Vue.extend({
    props: {
        error: {
            type: Error,
            required: false,
            default: undefined,
        },
    },
    data() {
        return {
            color: Constants.COLORS.BACKGROUND_GREY as string,
        };
    },
    computed: {
        message(): string {
            return `${this.error ? this.error : 'Unknown Error: There was an error :(.'}`;
        },
    },
});
</script>

<style lang="scss">
@import '@/styles/colors.scss';
</style>

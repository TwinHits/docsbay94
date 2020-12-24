<template>
    <v-icon class="icon-button" :color="iconColor" :size="size" :disabled="disabled" @click="handleClick" @click.stop>
        {{ icon }}
    </v-icon>
</template>

<script lang="ts">
import Vue from 'vue';

import * as Constants from '@/common/constants';

export default Vue.extend({
    props: {
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: false,
            default: 40,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            iconColor: Constants.COLORS.BACKGROUND_BLACK,
        };
    },
    methods: {
        handleClick() {
            this.$emit('click');
        },
    },
});
</script>

<style lang="scss" scoped></style>

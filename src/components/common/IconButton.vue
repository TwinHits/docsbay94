<template>
    <v-dialog v-model="dialog" width="500" :disabled="!confirm">
        <template v-slot:activator="{ on, attrs }">
            <v-icon
                class="icon-button"
                :color="iconColor"
                :size="size"
                :disabled="disabled"
                @click="handleClick"
                @click.stop
                :on="on"
                :attrs="attrs"
            >
                {{ icon }}
            </v-icon>
        </template>

        <v-card>
            <v-card-title class="confirm-title">
                Are you sure?
            </v-card-title>
            <v-card-actions class="confirm-actions">
                <v-spacer></v-spacer>
                <v-btn text @click="emitConfirm()">
                    Confirm
                </v-btn>
                <v-btn text @click="emitCancel()">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
        confirm: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            iconColor: Constants.COLORS.BACKGROUND_BLACK,
            dialog: false,
        };
    },
    methods: {
        handleClick() {
            if (this.confirm) {
                this.dialog = true;
            } else {
                this.$emit('click');
            }
        },
        emitConfirm() {
            this.dialog = false;
            this.$emit('click');
        },
        emitCancel() {
            this.dialog = false;
        },
    },
});
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.confirm-title {
    background-color: $highlight-grey;
}

.confirm-actions {
    background-color: $background-grey;
}
</style>

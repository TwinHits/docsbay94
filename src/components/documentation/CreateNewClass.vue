<template>
    <v-btn class="create-new-class" :color="color" fab x-large fixed bottom right @click="generateNewClass">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';

import * as Constants from '@/common/constants';
import { Class, Method } from '@/common/types/documentation';

const NAME_THIS_CLASS = 'Name this new class';
const DESCRIBE_THIS_CLASS = 'Describe this new class';

export default Vue.extend({
    data() {
        return {
            name: NAME_THIS_CLASS as string,
            description: DESCRIBE_THIS_CLASS as string,
            methods: [] as Method[],
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
    methods: {
        generateNewClass() {
            const newClass = new Class({
                name: this.name,
                description: this.description,
                methods: this.methods,
            });
            this.$emit('newClass', newClass);
        },
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';
</style>

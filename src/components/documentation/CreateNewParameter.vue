<template>
    <v-btn class="create-new-parameter" :color="color" fab x-small @click="generateNewParameter">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';

import * as Constants from '@/common/constants';
import { Parameter } from '@/common/types/documentation';
import { Type } from '@/api/types/documentation';

const NAME_THIS_PARAMETER = 'Name this new parameter';
const DESCRIBE_THIS_PARAMETER = 'Describe this new parameter';
const TYPE = 'void';

export default Vue.extend({
    data() {
        return {
            name: NAME_THIS_PARAMETER as string,
            description: DESCRIBE_THIS_PARAMETER as string,
            type: TYPE as Type,
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
    methods: {
        generateNewParameter() {
            const newParameter = new Parameter({
                name: this.name,
                description: this.description,
                type: this.type,
            });
            this.$emit('newParameter', newParameter);
        },
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.create-new-parameter {
    margin: -1vh 0 2vh 3vw;
}
</style>

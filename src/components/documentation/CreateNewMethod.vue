<template>
    <v-btn class="create-new-method" :color="color" fab medium absolute bottom right @click="generateNewMethod">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';

import * as Constants from '@/common/constants';
import { Method, Parameter } from '@/common/types/documentation';
import { Type } from '@/api/types/documentation';

const NAME_THIS_METHOD = 'Name this new method';
const DESCRIBE_THIS_METHOD = 'Describe this new method';
const RETURNS = 'void';

export default Vue.extend({
    data() {
        return {
            name: NAME_THIS_METHOD as string,
            description: DESCRIBE_THIS_METHOD as string,
            returns: RETURNS as Type,
            parameters: [] as Parameter[],
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
    methods: {
        generateNewMethod() {
            const newMethod = new Method({
                name: this.name,
                description: this.description,
                parameters: this.parameters,
                returns: this.returns,
            });
            this.$emit('newMethod', newMethod);
        },
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.create-new-method {

margin: 0 1vw 4vh 0;
}

</style>

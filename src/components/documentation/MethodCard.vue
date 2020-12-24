<template>
    <v-card class="method-card" outlined elevation="2" :color="color">
        <v-card-title>
            <EditableTextField :content="method.name" @save="saveName" />
        </v-card-title>
        <v-card-subtitle class="method-description">
            <EditableTextField :content="method.description" @save="saveDescription" />
        </v-card-subtitle>
        <template v-if="method.parameters && method.parameters.length > 0">
            <v-card-subtitle class="parameter-label">
                Parameters:
            </v-card-subtitle>
            <v-card-text class="v-card-text">
                <template v-for="(parameter, index) in method.parameters">
                    <ParameterChip :parameter="parameter" :key="index" />
                </template>
            </v-card-text>
        </template>
        <v-card-subtitle class="returns-label">
            Returns:
        </v-card-subtitle>
        <v-card-text class="v-card-text">
            <EditableTextField :content="method.returns" @save="saveReturns" />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';

import { Method } from '@/common/types/documentation';
import { Type } from '@/api/types/documentation';

import EditableTextField from '@/components/common/EditableTextField.vue';
import ParameterChip from '@/components/documentation/ParameterChip.vue';

export default Vue.extend({
    props: {
        method: {
            type: Object as PropType<Method>,
            required: true,
        },
    },
    data() {
        return {
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
    components: {
        EditableTextField,
        ParameterChip,
    },
    methods: {
        saveName(name: string) {
            this.method.name = name;
        },
        saveDescription(description: string) {
            this.method.description = description;
        },
        saveReturns(returns: Type) {
            this.method.returns = returns;
        },
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.parameter-label,
.returns-label {
    padding-top: 0vh;
    padding-bottom: 0.5vh;
    font-weight: bold;
    font-size: 1em;
}

.v-card-text,
.parameter-description {
    margin-left: 1vw;
}
</style>

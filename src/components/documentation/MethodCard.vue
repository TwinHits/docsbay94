<template>
    <v-card class="method-card" outlined elevation="2" :color="color">
        <v-card-title>
            <v-row justify="space-between">
                <v-col md="auto">
                    <EditableTextField :content="method.name" @save="saveName" />
                </v-col>
                <v-col md="auto">
                    <IconButton icon="mdi-delete" :size="30" @click="trash()" />
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-subtitle class="method-description">
            <EditableTextField :content="method.description" @save="saveDescription" />
        </v-card-subtitle>
        <template v-if="method.parameters">
            <v-card-subtitle class="parameter-label">
                Parameters:
            </v-card-subtitle>
            <v-card-text class="v-card-text">
                <template v-for="(parameter, index) in method.parameters">
                    <ParameterChip :parameter="parameter" :key="index" @save="save()" @trash="trashParameter" />
                </template>
                <CreateNewParameter @newParameter="addNewParameter($event, method)" />
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

import { Method, Parameter } from '@/common/types/documentation';
import { Type } from '@/api/types/documentation';

import CreateNewParameter from '@/components/documentation/CreateNewParameter.vue';
import EditableTextField from '@/components/common/EditableTextField.vue';
import IconButton from '@/components/common/IconButton.vue';
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
        CreateNewParameter,
        EditableTextField,
        IconButton,
        ParameterChip,
    },
    methods: {
        saveName(name: string) {
            this.method.name = name;
            this.save();
        },
        saveDescription(description: string) {
            this.method.description = description;
            this.save();
        },
        saveReturns(returns: Type) {
            this.method.returns = returns;
        },
        addNewParameter(newParmameter: Parameter, method: Method) {
            method.parameters.push(newParmameter);
        },
        save() {
            this.$emit('save');
        },
        trash() {
            this.$emit('trash', this.method);
        },
        trashParameter(parameter: Parameter) {
            this.method.parameters = this.method.parameters.filter((p) => p !== parameter);
            this.save();
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

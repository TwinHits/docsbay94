<template>
    <v-card class="method-card" outlined elevation="2" :color="color">
        <v-card-title>
            <MethodChip :method="method" />
        </v-card-title>
        <v-card-subtitle>
            <EditableTextField :content="method.description" @save="saveDescription" />
        </v-card-subtitle>
        <v-card-text v-if="method.parameters && method.parameters.length > 0">
            <template v-for="(parameter, index) in method.parameters">
                <ParameterChip :parameter="parameter" :key="index" />
            </template>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';

import { Method } from '@/common/types/documentation';

import EditableTextField from '@/components/common/EditableTextField.vue';
import ParameterChip from '@/components/documentation/ParameterChip.vue';
import MethodChip from '@/components/documentation/MethodChip.vue';

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
        MethodChip,
    },
    methods: {
        saveDescription(description: string) {
            this.method.description = description;
        },
    }
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';
</style>

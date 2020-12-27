<template>
    <div class="parameter-chip">
        <v-row justify="start">
            <v-col md="auto">
                <span class="parameter-type"> {{ parameter.type }} </span>
                <span class="parameter-name"> {{ parameter.name }} </span>
                <span class="parameter-description"> {{ parameter.description }} </span>
            </v-col>
            <v-col md="auto">
                <IconButton icon="mdi-delete" :size="20" @click="trash" />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';
import { Parameter } from '@/common/types/documentation';
import IconButton from '../common/IconButton.vue';

export default Vue.extend({
    props: {
        parameter: {
            type: Object as PropType<Parameter>,
            required: true,
        },
    },
    components: {
        IconButton,
    },
    data() {
        return {
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
    methods: {
        trash() {
            this.$emit('trash', this.parameter);
        },
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.parameter-type {
}

.parameter-name {
    font-weight: bold;
}

.parameter-description {
}
</style>

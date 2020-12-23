<template>
    <v-card class="class-card" outlined elevation="1" :color="color">
        <v-card-title>
            {{ classDefinition.name }}
        </v-card-title>
        <v-card-subtitle>
            {{ classDefinition.description }}
        </v-card-subtitle>
    </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';
import Class from '@/api/types/documentation';

export default Vue.extend({
    props: {
        classDefinition: {
            type: Object as PropType<Class>,
            required: true,
        },
    },
    data() {
        return {
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';
</style>

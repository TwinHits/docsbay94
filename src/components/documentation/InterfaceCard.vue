<template>
    <v-card class="interface-card" outlined elevation="1" :color="color">
        <v-card-title>
            {{ Interface.name }}
        </v-card-title>
        <v-card-subtitle>
            {{ Interface.description }}
        </v-card-subtitle>
    </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';
import Interface from '@/api/types/documentation';

export default Vue.extend({
    props: {
        Interface: {
            type: Object as PropType<Interface>,
            required: true,
        }
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

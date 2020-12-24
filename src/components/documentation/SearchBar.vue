<template>
    <v-text-field
        dense
        v-model="searchTerm"
        label="Search"
        @change="filterDocumentation"
        :background-color="backgroundColor"
        :color="color"
    ></v-text-field>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';

import { Documentation } from '@/common/types/documentation';
export default Vue.extend({
    props: {
        documentation: {
            type: Object as PropType<Documentation>,
            required: true,
        },
    },
    data() {
        return {
            color: Constants.COLORS.HIGHTLIGHT_GREY,
            backgroundColor: Constants.COLORS.BACKGROUND_GREY,
            searchTerm: undefined as string | undefined,
        };
    },
    methods: {
        filterDocumentation(searchTerm: string) {
            const filteredDocumentation = new Documentation(this.documentation);
            filteredDocumentation.searchChildren(searchTerm);
            this.$emit('search', filteredDocumentation);
        },
    },
    watch: {
        searchTerm(searchTerm: string) {
            this.filterDocumentation(searchTerm);
        },
    },
});
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
</style>

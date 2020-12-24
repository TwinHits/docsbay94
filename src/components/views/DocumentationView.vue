<template>
    <div class="documentation-view">
        <!-- Search bar -->
        <v-row class="search-bar-row">
            <SearchBar :documentation="documentation" @search="onSearch" />
        </v-row>
        <v-row class="expansion-panels-row">
            <v-expansion-panels inset multiple class="expansion-panels" v-model="expandedPanels" :tile="true">
                <!-- Class Panels -->
                <template v-for="(classDefinition, index) in filteredDocumentation.classes">
                    <v-expansion-panel :key="index" v-if="classDefinition.display" class="expansion-panel">
                        <v-expansion-panel-header
                            class="expansion-panel-header"
                            :hide-actions="true"
                            @keyup.space.prevent
                        >
                            <ClassCard :classDefinition="classDefinition" />
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="expansion-panel-content">
                            <template v-for="(method, index) in classDefinition.methods">
                                <MethodCard :method="method" :key="index" class="method-card" v-if="method.display" />
                            </template>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </template>
                <!-- Create New Panel  -->
                <v-expansion-panel class="expansion-panel">
                    <v-expansion-panel-header
                        class="expansion-panel-header"
                        @keyup.space.prevent
                        :disable-icon-rotate="true"
                    >
                        Create New Class...
                        <template v-slot:actions>
                            <v-icon large :color="iconColor">
                                mdi-plus
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="expansion-panel-content">
                        <NewClassCard @save="saveNewClass" />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
        <ErrorAlert v-if="error" :error="error" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ErrorAlert from '@/components/common/ErrorAlert.vue';
import ClassCard from '@/components/documentation/ClassCard.vue';
import MethodCard from '@/components/documentation/MethodCard.vue';
import NewClassCard from '@/components/documentation/NewClassCard.vue';
import SearchBar from '@/components/documentation/SearchBar.vue';

import DocsApi from '@/api/docs';

import { Class, Documentation } from '@/common/types/documentation';

import * as Constants from '@/common/constants';

export default Vue.extend({
    data() {
        return {
            loading: true as boolean,
            docsUrl: 'https://raw.githubusercontent.com/TwinHits/TIEngine/master/docs/docs.json' as string,
            documentation: {} as Documentation,
            filteredDocumentation: {} as Documentation,
            error: undefined as Error | undefined,
            expandedPanels: [] as number[],
            iconColor: Constants.COLORS.BACKGROUND_BLACK,
        };
    },
    components: {
        ErrorAlert,
        ClassCard,
        MethodCard,
        NewClassCard,
        SearchBar,
    },
    methods: {
        onSearch(filteredDocumentation: Documentation) {
            this.filteredDocumentation = filteredDocumentation;
            this.expandedPanels = [];
            for (const [index, c] of filteredDocumentation.classes.entries()) {
                if (c.display) {
                    // + 1 because of Create new Class is index 0
                    this.expandedPanels.push(index + 1);
                }
            }
        },
        saveNewClass(newClass: Class) {
            // The Create New Class... expansion panel is index 0 for some reason, this feels liable to break
            this.expandedPanels = this.expandedPanels.filter((i) => i !== 0);
            this.documentation.classes.push(newClass);
        },
    },
    async mounted() {
        this.loading = true;
        try {
            this.documentation = await DocsApi.getDocsFromURL(this.docsUrl);
            this.filteredDocumentation = this.documentation;
        } catch (error) {
            this.error = error;
        } finally {
            this.loading = false;
        }
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.search-bar-row,
.expansion-panels-row {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
}

.search-bar-row {
    background-color: $background-grey;
    padding: 2vh 1vw 0vh 1vw;
}

.expansion-panel {
    margin-top: 1vh;
}

.expansion-panel-header {
    background-color: $background-grey;
}

.expansion-panel-content {
    background-color: $background-grey;
}

.method-card {
    margin: 1vh 1vw 1vh 1vw;
}
</style>

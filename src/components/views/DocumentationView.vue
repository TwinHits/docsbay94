<template>
    <div class="documentation-view">
        <!-- Search bar -->
        <v-row class="search-bar-row">
            <SearchBar :documentation="documentation" @search="onSearch" />
        </v-row>
        <v-row class="expansion-panels-row">
            <v-expansion-panels inset multiple class="expansion-panels" v-model="expandedPanels" :tile="true">
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
            </v-expansion-panels>
            <NewClassButton @newClass="addNewClass" />
        </v-row>
        <ErrorAlert v-if="error" :error="error" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ClassCard from '@/components/documentation/ClassCard.vue';
import ErrorAlert from '@/components/common/ErrorAlert.vue';
import MethodCard from '@/components/documentation/MethodCard.vue';
import NewClassButton from '@/components/documentation/NewClassButton.vue';
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
        ClassCard,
        ErrorAlert,
        MethodCard,
        NewClassButton,
        SearchBar,
    },
    methods: {
        onSearch(filteredDocumentation: Documentation) {
            this.filteredDocumentation = filteredDocumentation;
            this.expandedPanels = [];
            for (const [index, c] of filteredDocumentation.classes.entries()) {
                if (c.display) {
                    this.expandedPanels.push(index);
                }
            }
        },
        addNewClass(newClass: Class) {
            this.expandedPanels = [];
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
    margin-bottom: 2vh;
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

.create-new-card-btn {
    margin-bottom: 6vh;
}
</style>

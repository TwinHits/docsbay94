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
                            <CreateNewMethod @newMethod="addNewMethod($event, classDefinition)" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </template>
            </v-expansion-panels>
            <CreateNewClass @newClass="addNewClass" />
        </v-row>
        <ErrorAlert v-if="error" :error="error" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ClassCard from '@/components/documentation/ClassCard.vue';
import ErrorAlert from '@/components/common/ErrorAlert.vue';
import MethodCard from '@/components/documentation/MethodCard.vue';
import CreateNewClass from '@/components/documentation/CreateNewClass.vue';
import CreateNewMethod from '@/components/documentation/CreateNewMethod.vue';
import SearchBar from '@/components/documentation/SearchBar.vue';

import DocsApi from '@/api/docs';

import { Class, Documentation, Method } from '@/common/types/documentation';

import * as Constants from '@/common/constants';

import * as Config from '../../.docsbay94.config';

export default Vue.extend({
    data() {
        return {
            loading: true as boolean,
            docsUrl: Config.docsUrl,
            documentation: {} as Documentation,
            filteredDocumentation: {} as Documentation,
            error: undefined as Error | undefined,
            expandedPanels: [] as number[],
            iconColor: Constants.COLORS.BACKGROUND_BLACK,
        };
    },
    components: {
        ClassCard,
        CreateNewClass,
        CreateNewMethod,
        ErrorAlert,
        MethodCard,
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
        addNewMethod(newMethod: Method, currentClass: Class) {
            currentClass.methods.push(newMethod);
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
    padding-bottom: 4vh;
}

.method-card {
    margin: 1vh 1vw 1vh 1vw;
}

.create-new-class {
    margin: 6vh 1vw;
}
</style>

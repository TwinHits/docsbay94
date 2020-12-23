<template>
    <div class="documentation-view">
        <v-row class="expansion-panels-row">
            <v-expansion-panels inset class="expansion-panels">
                <v-expansion-panel
                    v-for="(classDefinition, index) in documentation.classes"
                    :key="index"
                    class="expansion-panel"
                >
                    <v-expansion-panel-header class="expansion-panel-header">
                        <ClassCard :classDefinition="classDefinition" />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="expansion-panel-content">
                        <template v-for="(method, index) in classDefinition.methods">
                            <MethodCard :method="method" :key="index" class="method-card" />
                        </template>
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
import MethodCard from '@/components/documentation/MethodCard';

import DocsApi from '@/api/docs';

import Documentation from '@/api/types/documentation';

export default Vue.extend({
    data() {
        return {
            loading: true as boolean,
            docsUrl: 'https://raw.githubusercontent.com/TwinHits/TIEngine/master/docs/docs.json' as string,
            documentation: {} as Documentation,
            error: undefined as Error | undefined,
        };
    },
    components: {
        ErrorAlert,
        ClassCard,
        MethodCard,
    },
    async mounted() {
        this.loading = true;
        try {
            this.documentation = await DocsApi.getJSONFromURL(this.docsUrl);
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

.expansion-panels-row {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
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

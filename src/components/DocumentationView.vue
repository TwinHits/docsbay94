<template>
    <div class="documentation-view">
        <v-row class="expansion-panels-row">
            <v-expansion-panels inset class="expansion-panels">
                <v-expansion-panel
                    v-for="(interfaceDocs, index) in documentation.interfaces"
                    :key="index"
                    class="expansion-panel"
                >
                    <v-expansion-panel-header class="expansion-panel-header">
                        <InterfaceCard :interface="interfaceDocs" />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="expansion-panel-content">
                        {{ interfaceDocs }}
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
import InterfaceCard from '@/components/documentation/InterfaceCard.vue';

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
        InterfaceCard,
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
    background-color: $highlight-grey;
}
</style>

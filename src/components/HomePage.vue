<template>
    <div class="home-page">
        <v-img class="tie-logo" contain :src="logoUrl" />
        <v-row class="docs" v-for="(docs, index) of docsUrls" :key="index">
            <v-col>
                {{ docs }}
            </v-col>
        </v-row>
        <ErrorAlert v-if="error" :error="error" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ErrorAlert from '@/components/common/ErrorAlert.vue';

import DocsApi from '@/api/docs';

export default Vue.extend({
    data() {
        return {
            loading: true as boolean,
            logoUrl: 'https://raw.githubusercontent.com/TwinHits/TIEngine/master/assets/textures/logo.png' as string,
            docsUrls: ['https://raw.githubusercontent.com/TwinHits/TIEngine/master/docs/docs.json'] as string[],
            docs: [] as string[],
            error: undefined as Error | undefined,
        };
    },
    components: {
        ErrorAlert,
    },
    async mounted() {
        this.loading = true;
        try {
            const docs = [];
            for (const url of this.docsUrls) {
                docs.push(await DocsApi.getJSONFromURL(url));
            }
            return docs;
        } catch (error) {
            this.error = error;
        } finally {
            this.loading = false;
        }
    },
});
</script>
<style lang="scss">
@import '@/styles/colors.scss';

.tie-logo {
    width: 25vw;
}

.docs {
    color: white;
}
</style>

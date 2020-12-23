<template>
    <div class="home-page">
        <v-img class="tie-logo" contain :src="logoUrl" />
        <v-row class="docs" v-for="(d, index) of docs" :key="index">
            <v-col>
                {{ d }}
            </v-col>
        </v-row>
        <ErrorAlert v-if="error" :error="error" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ErrorAlert from '@/components/common/ErrorAlert.vue';

import DocsApi from '@/api/docs';

import Documentation from '@/api/types/documentation';

export default Vue.extend({
    data() {
        return {
            loading: true as boolean,
            logoUrl: 'https://raw.githubusercontent.com/TwinHits/TIEngine/master/assets/textures/logo.png' as string,
            docsUrls: ['https://raw.githubusercontent.com/TwinHits/TIEngine/master/docs/docs.json'] as string[],
            docs: [] as Documentation[],
            error: undefined as Error | undefined,
        };
    },
    components: {
        ErrorAlert,
    },
    async mounted() {
        this.loading = true;
        try {
            for (const url of this.docsUrls) {
                this.docs.push(await DocsApi.getJSONFromURL(url));
            }
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

<template>
    <v-app-bar elevation="2" dense :color="color" app>
        <v-app-bar-nav-icon><v-img src="@/assets/logo_icon_32x32.png"/></v-app-bar-nav-icon>
        <IconButton icon="mdi-download" @click="download" />
        <IconButton icon="mdi-refresh" @click="refresh" />
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

import * as Constants from '@/common/constants';
import * as Config from '../../.docsbay94.config';

import IconButton from '@/components/common/IconButton.vue';

import DocsApi from '@/api/docs';

export default Vue.extend({
    data() {
        return {
            color: Constants.COLORS.BACKGROUND_GREY as string,
        };
    },
    components: {
        IconButton
    },
    methods: {
        download() {
            DocsApi.downloadDocsFromLocalStorage();
        },
        async refresh() {
            const documentation = await DocsApi.getDocsFromURL(Config.docsUrl);
            await DocsApi.writeDocsToLocalStorage(documentation);
        }
    }
});
</script>

<style scoped lang="scss"></style>

<template>
    <div class="home-page">
        <v-img class="tie-logo" contain :src="logoUrl" />
        <v-row class="docs" v-for="(index, docs) of docsUrls" :key="index">
            {{ docs }}
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            logoUrl: 'https://raw.githubusercontent.com/TwinHits/TIEngine/master/assets/textures/logo.png' as string,
            docsUrls: ['https://github.com/TwinHits/TIEngine/blob/master/docs/docs.json'] as string[],
        };
    },
});
</script>
<style lang="scss">
.tie-logo {
    width: 25vw;
}

.docs {
    color: white;
}
</style>

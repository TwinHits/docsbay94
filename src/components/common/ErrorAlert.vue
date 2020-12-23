<template>
    <v-alert class="error-alert" border="left" dismissible elevation="2" color="#767473" >
        {{ message }}
    </v-alert>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        error: {
            type: Error,
            required: false,
            default: undefined,
        },
    },
    computed: {
        message(): string {
            return `${this.error ? this.error : 'Unknown Error: There was an error :(.'}`;
        },
    },
});
</script>

<style lang="scss">
@import '@/styles/colors.scss';

.error-alert {
}
</style>

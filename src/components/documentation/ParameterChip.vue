<template>
    <div class="parameter-chip">
        <span class="parameter-type"> {{ parameter.type }} </span>
        <span class="parameter-name"> {{ parameter.name }} </span>
        <span class="parameter-description"> {{ parameter.description }} </span>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';
import Parameter from '@/api/types/documentation';

export default Vue.extend({
    props: {
        parameter: {
            type: Object as PropType<Parameter>,
            required: true,
        },
    },
    data() {
        return {
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.parameter-type {
    font-weight: bold;
}

.parameter-name {
}

.parameter-description {
}
</style>

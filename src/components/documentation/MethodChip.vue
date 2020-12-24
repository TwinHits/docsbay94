<template>
    <div class="method-chip">
        <span class="method-returns"> {{ method.returns }} </span>
        <span class="method-name"> {{ method.name }} </span>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import * as Constants from '@/common/constants';
import { Method } from '@/common/types/documentation';

export default Vue.extend({
    props: {
        method: {
            type: Object as PropType<Method>,
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

.method-returns {
    font-weight: bold;
}

.method-name {
}
</style>

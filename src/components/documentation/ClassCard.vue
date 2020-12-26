<template>
    <v-card class="class-card" outlined elevation="1" :color="color">
        <v-card-title class="class-card-title">
            <EditableTextField :content="classDefinition.name" @save="saveName" />
        </v-card-title>
        <v-card-subtitle>
            <EditableTextField :content="classDefinition.description" @save="saveDescription" />
        </v-card-subtitle>
    </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import EditableTextField from '@/components/common/EditableTextField.vue';

import * as Constants from '@/common/constants';
import { Class } from '@/common/types/documentation';

export default Vue.extend({
    props: {
        classDefinition: {
            type: Object as PropType<Class>,
            required: true,
        },
    },
    components: {
        EditableTextField,
    },
    data() {
        return {
            color: Constants.COLORS.HIGHLIGHT_GREY,
        };
    },
    methods: {
        saveName(name: string) {
            this.classDefinition.name = name;
            this.$emit('save');
        },
        saveDescription(description: string) {
            this.classDefinition.description = description;
            this.$emit('save');
        },
    },
});
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

.class-card-title {
    font-weight: bold;
}
</style>

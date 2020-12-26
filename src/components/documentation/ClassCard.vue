<template>
    <v-card class="class-card" outlined elevation="1" :color="color">
        <v-card-title class="class-card-title">
            <v-row justify="space-between">
                <v-col md="auto">
                    <EditableTextField :content="classDefinition.name" @save="saveName" />
                </v-col>
                <v-col md="auto">
                    <IconButton icon="mdi-delete" :size="30" @click="trash()" />
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-subtitle>
            <EditableTextField :content="classDefinition.description" @save="saveDescription" />
        </v-card-subtitle>
    </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import EditableTextField from '@/components/common/EditableTextField.vue';
import IconButton from '@/components/common/IconButton.vue';

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
        IconButton,
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
        trash() {
            this.$emit('trash', this.classDefinition);
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

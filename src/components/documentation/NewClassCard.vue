<template>
    <v-row>
        <v-col>
            <v-card class="class-card" outlined elevation="1" :color="color">
                <v-card-title class="class-card-title">
                    <EditableTextField :content="name" @save="saveName" />
                </v-card-title>
                <v-card-subtitle>
                    <EditableTextField :content="description" @save="saveDescription" />
                </v-card-subtitle>
            </v-card>
        </v-col>
        <v-icon size="40" :color="iconColor" @click="save">
            mdi-content-save-outline
        </v-icon>
    </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import EditableTextField from '@/components/common/EditableTextField.vue';

import * as Constants from '@/common/constants';
import { Class, Method } from '@/common/types/documentation';

export default Vue.extend({
    components: {
        EditableTextField,
    },
    data() {
        return {
            name: 'Name this new class' as string,
            description: 'Describe this new class' as string,
            methods: [] as Method[],
            color: Constants.COLORS.HIGHLIGHT_GREY,
            iconColor: Constants.COLORS.BACKGROUND_BLACK,
        };
    },
    methods: {
        saveName(name: string) {
            this.name = name;
        },
        saveDescription(description: string) {
            this.description = description;
        },
        save() {
            const newClass = new Class({
                name: this.name,
                description: this.description,
                methods: this.methods,
            });
            this.$emit('save', newClass);
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

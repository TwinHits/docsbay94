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
        <IconButton icon="mdi-content-save-outline" :size="40" :disabled="!dirty" @click="save" />
    </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import EditableTextField from '@/components/common/EditableTextField.vue';
import IconButton from '@/components/common/IconButton.vue';

import * as Constants from '@/common/constants';
import { Class, Method } from '@/common/types/documentation';

const NAME_THIS_CLASS = 'Name this new class';
const DESCRIBE_THIS_CLASS = 'Describe this new class';

export default Vue.extend({
    components: {
        EditableTextField,
        IconButton,
    },
    data() {
        return {
            name: NAME_THIS_CLASS as string,
            description: DESCRIBE_THIS_CLASS as string,
            methods: [] as Method[],
            color: Constants.COLORS.HIGHLIGHT_GREY,
            iconColor: Constants.COLORS.BACKGROUND_BLACK,
            dirty: false,
        };
    },
    methods: {
        saveName(name: string) {
            this.name = name;
            this.dirty = true;
        },
        saveDescription(description: string) {
            this.description = description;
            this.dirty = true;
        },
        save() {
            if (this.dirty) {
                const newClass = new Class({
                    name: this.name,
                    description: this.description,
                    methods: this.methods,
                });
                this.resetCard();
                this.$emit('save', newClass);
            }
        },
        resetCard() {
            this.name = DESCRIBE_THIS_CLASS;
            this.description = DESCRIBE_THIS_CLASS;
            this.methods = [];
            this.dirty = false;
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

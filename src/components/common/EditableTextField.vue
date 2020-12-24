<template>
    <div @click.stop="setEdittingContent(true)" class="editable-text-field">
        <span v-if="!edittingContent">{{ content }}</span>
        <v-text-field
            v-else
            v-model="edittedContent"
            outlined
            dense
            autofocus
            append-icon="mdi-content-save-outline"
            @click:append="save"
            @keydown.esc="setEdittingContent(false)"
            @keydown.enter="save"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    props: {
        content: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            edittedContent: this.content as string,
            edittingContent: false as boolean,
        };
    },
    methods: {
        setEdittingContent(edittingContent: boolean) {
            this.edittingContent = edittingContent;
        },
        save() {
            this.setEdittingContent(false);
            return this.$emit('save', this.edittedContent);
        },
    },
});
</script>

<style lang="scss" scoped>
.editable-text-field {
    width: 33%;
}
</style>

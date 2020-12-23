<template>
  <div class="home-page">
      <v-img class="tie-logo" contain :src="logoUrl" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            logoUrl: "https://raw.githubusercontent.com/TwinHits/TIEngine/master/assets/textures/logo.png" as string,
        }
    }
});
</script>
<style lang="scss">

.tie-logo {
    width: 25vw;
}

</style>

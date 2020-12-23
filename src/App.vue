<template>
    <v-app>
        <v-content>
            <v-main>
                <v-container id="app">
                    <router-view />
                </v-container>
            </v-main>
        </v-content>
    </v-app>
</template>

<style lang="scss">
@import "@/styles/colors.scss";
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: $background-black;
    width: 100%;
    height: 100%;
}

body {
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>
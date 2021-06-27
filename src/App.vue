<template>
  <div id="app">
    <Header />
    <Conteudo />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Conteudo from "./components/Conteudo.vue";

export default {
  name: "App",
  components: {
    Header,
    Conteudo
  },
  methods: {}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

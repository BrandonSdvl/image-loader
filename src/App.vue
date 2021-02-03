<template lang="pug">
  div#app
    section.card
      Upload(v-show="!loading")
      Loading(v-show="loading")
</template>

<script>
import Upload from "./components/Upload.vue";
import Loading from "./components/Loading.vue";

export default {
  name: "App",
  components: {
    Upload,
    Loading
  },
  data() {
    return {
      loading: false,
      uploaded: false
    };
  }
};
</script>

<style lang="scss" src="./scss/styles.scss"></style>

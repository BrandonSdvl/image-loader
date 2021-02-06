<template lang="pug">
  div#app
    section.card
      Upload(v-show="!uploaded && !loading")
      Loading(v-show="loading")
      Uploaded(v-show="uploaded")
</template>

<script>
import Upload from "./components/Upload.vue";
import Loading from "./components/Loading.vue";
import Uploaded from "./components/Uploaded";

export default {
  name: "App",
  components: {
    Upload,
    Loading,
    Uploaded
  },
  data() {
    return {
      loading: false,
      uploaded: false,
      imgPath: "",
      host: "http://localhost:3000"
    };
  }
};
</script>

<style lang="scss" src="./scss/styles.scss"></style>

<template lang="pug">
article.card__uploaded
    img(src="../assets/success.svg").card__icon
    h2.card__title Uploaded Successfully!
    div.card__image-container
      img(:src="this.$parent.imgPath" )
    div.card__link-container
      input(type="text", v-model="this.$parent.imgPath").card__input
      button(
        v-clipboard:copy="this.$parent.imgPath", 
        v-clipboard:success="onCopy", 
        v-clipboard:error="onError"
      ).card__button Copy Link
      span(v-show="copied" v-text="messageStatus").card__status-copy
        
</template>
<script>
export default {
  name: "Uploaded",
  data() {
    return {
      messageStatus: "",
      copied: false
    };
  },
  methods: {
    onCopy() {
      this.messageStatus = "Link copied to clipboard";
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
    onError() {
      this.messageStatus = "Error, use Ctrl + C";
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }
};
</script>

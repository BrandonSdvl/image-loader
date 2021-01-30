<template lang="pug">
article.card__content
  h1.card__title Upload your image
  h2.card__subtitle File should be Jpeg, Png,...
  article#dragArea.card__image-loader(
    @drop="dragEnd",
    @dragenter.prevent,
    @dragover.prevent
  )
    img.card__image(src="../assets/image.svg")
    span.card__text Drag & Drop your image here
  span.card__text Or
  input#file.card__file.card__button(
    type="file",
    accept="image/*",
    @change="fileSelected"
  )
  label.card__button(for="file") Choose a file
</template>

<script>
export default {
  name: "Upload",
  methods: {
    validate(type) {
      let regex = /image/;
      if (regex.test(type)) {
        console.log("imagen");
      } else {
        console.log("no imagen");
      }
    },
    dragEnd(e) {
      e.preventDefault();
      let files = e.dataTransfer.files;
      this.validate(files[0].type);
    },
    fileSelected(e) {
      e.preventDefault();
      let files = e.target.files;
      if (files[0]) this.validate(files[0].type);
    },
  },
};
</script>

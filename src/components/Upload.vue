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
    name="file",
    ref="fileInput",
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
    data() {
      return {
        files: []
      };
    },
    validate(type) {
      this.$parent.loading = true;
      let regex = /image/;
      if (regex.test(type)) {
        let file = this.files[0];
        this.send(file);
      } else {
        alert("The file selcted isn't an image");
      }
    },
    dragEnd(e) {
      e.preventDefault();
      this.files = e.dataTransfer.files;
      this.validate(this.files[0].type);
    },
    fileSelected(e) {
      e.preventDefault();
      this.files = e.target.files;
      if (this.files[0]) this.validate(this.files[0].type);
    },
    async send(file) {
      let data = new FormData();
      data.append("file", file);
      this.$refs.fileInput.value = null;

      await this.$http({
        url: `${this.$parent.host}/upload`,
        body: data,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          this.$parent.loading = false;
          this.$parent.uploaded = true;
          this.$parent.imgPath = `${this.$parent.host}${
            response.body.path.split("server")[1]
          }`;
        })
        .catch(errorResponse => {
          console.log(errorResponse);
        });
    }
  }
};
</script>

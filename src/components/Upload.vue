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
  form(method="POST" action="/upload" enctype="multipart/form-data" @submit.prevent name="formImage")
    input#file.card__file.card__button(
      name="file"
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
        files: null,
        drag: false
      };
    },
    validate(type) {
      let regex = /image/;
      if (regex.test(type)) {
        console.log("imagen");
        if (this.drag) {
          let data = new FormData();
          var file = this.files[0];
          data.append("file", file);

          this.$http({
            url: "http://localhost:3000/upload",
            body: data,
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
            .then(response => {
              console.log(response);
            })
            .catch(errorResponse => {
              console.log(errorResponse);
            });
        } else {
          document.formImage.submit();
        }
      } else {
        alert("The file selcted isn't an image");
        console.log("no imagen");
      }
    },
    dragEnd(e) {
      e.preventDefault();
      this.drag = true;
      this.files = e.dataTransfer.files;
      this.validate(this.files[0].type);
    },
    fileSelected(e) {
      e.preventDefault();
      this.files = e.target.files;
      if (this.files[0]) this.validate(this.files[0].type);
    }
  }
};
</script>

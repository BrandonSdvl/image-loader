<template lang="pug">
article.card__uploaded
    img(src="../assets/success.svg").card__icon
    h2.card__title Uploaded Successfully!
    div.card__image-container
      img(:src="this.$parent.imgPath" )
    div.card__link-container
        input(type="text").card__input
        button.card__button Copy Link
</template>
<script>
export default {
  name: "Uploaded"
};
</script>

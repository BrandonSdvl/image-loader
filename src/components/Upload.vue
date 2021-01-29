<template lang="pug">
    article.card__content
        h1.card__title Upload your image
        h2.card__subtitle File should be Jpeg, Png,...
        article#dragArea.card__image-loader(@dragenter="dragStart()" @drop="dragEnd(e)")
            img(src="../assets/image.svg").card__image
            span.card__text Drag & Drop your image here
        span.card__text Or
        button.card__button Choose a file
</template>

<script></script>

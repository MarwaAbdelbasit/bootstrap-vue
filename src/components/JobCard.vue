<template>
    <b-card
        :title="name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="image"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
    >
        <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
        <b-button variant="primary">Apply</b-button>
    </b-card>
</template>

<script>
export default {
    name: 'JobCard',
    props: ["name"]
}
</script>
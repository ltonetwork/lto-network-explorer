<template>
  <v-footer
    color="#17054B"
    height="250px"
    max-height="250px"
    tile
    flat
    app
  >
    <span>&copy; 2019</span>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    locales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

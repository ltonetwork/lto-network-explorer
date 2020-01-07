<template>
  <v-app light>
    <Navigation />
    <Panel />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation'
import Panel from '~/components/Panel'
import Footer from '~/components/Footer'

export default {
  components: {
    Navigation,
    Panel,
    Footer
  }
}
</script>

<template>
  <v-app light>
    <Header />
    <Search />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/Header'
import Search from '~/components/Search'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Search,
    Footer
  }
}
</script>

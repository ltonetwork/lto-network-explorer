<template>
  <v-app light>
    <Header />
    <Search />
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
import Header from '~/components/Header'
import Search from '~/components/Search'
import Panel from '~/components/Panel'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Search,
    Panel,
    Footer
  }
}
</script>

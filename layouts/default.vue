<template>
  <v-app light>
    <Header />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'

  @Component({
    components: {
      Header,
      Footer
    }
  })

  class Layout extends Vue {
  }

  export default Layout
</script>

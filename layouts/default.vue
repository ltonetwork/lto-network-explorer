<template>
  <v-app light>
    <v-app-bar
      fixed
      height="250"
      flat
      extended
      app
      style="background-color: #17054B;"
    >
      <v-toolbar-title
        v-text="title"
      />
      <v-spacer />
      <v-btn>
        link
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Nodes Overview',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Staked Info',
          to: '/inspire'
        }
      ],
      title: 'LTO Network Explorer'
    }
  }
}
</script>

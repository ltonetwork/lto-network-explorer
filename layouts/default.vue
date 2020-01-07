<template>
  <v-app light>
    <v-app-bar
      fixed
      height="250"
      flat
      app
      color="#17054B"
    >
      <v-toolbar
        absolute
        color="#17054B"
        flat
      >
        <img :src="require('@/assets/logo.png')" class="mr-3" height="40">
        <v-toolbar-title
          v-text="title"
        />

        <v-spacer />

        <v-toolbar-items>
          <v-btn text>
            Link 1
          </v-btn>
          <v-btn text>
            Link 2
          </v-btn>
          <v-btn text>
            Link 3
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-text-field
        solo-inverted
        hide-details
        flat
        rounded
        label="Search for a transaction ID, address or block."
        prepend-inner-icon="mdi-magnify"
        background-color="#30195d"
        color="#6e5f8e"
      />
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
      title: 'LTO Explorer'
    }
  }
}
</script>

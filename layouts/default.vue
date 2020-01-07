<template>
  <v-app light>
    <v-card flat>
      <v-toolbar
        fixed
        height="250"
        flat
        app
        color="#17054B"
      >
        <v-container>
          <v-toolbar
            absolute
            color="#17054B"
            flat
            class="white--text"
          >
            <img :src="require('@/assets/logo.png')" class="mr-3" height="40">
            <v-toolbar-title
              v-text="title"
            />

            <v-toolbar-items>
              <v-btn class="white--text" text>
                Link 1
              </v-btn>
              <v-btn class="white--text" text>
                Link 2
              </v-btn>
              <v-btn class="white--text" text>
                Link 3
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-container>
            <v-row justify="center">
              <v-col cols="6" md="6">
                <v-text-field
                  solo-inverted
                  hide-details
                  flat
                  rounded
                  label="Search for a transaction ID, address or block"
                  prepend-inner-icon="mdi-magnify"
                  background-color="#30195d"
                  color="#6e5f8e"
                />
              </v-col>

              <v-col cols="2" md="2">
                <v-btn
                  outlined
                  rounded
                  flat
                  color="#30195d"
                  height="50"
                >
                  Calculator
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-toolbar>

      <v-card
        class="mx-auto"
        max-width="960"
        style="margin-top: -35px;"
      >
        <v-card-text style="height: 100px;" />
      </v-card>
    </v-card>

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

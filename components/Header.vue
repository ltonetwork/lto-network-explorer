<template>
  <div>
    <v-card flat>
      <v-toolbar
        height="250px"
        tile
        flat
        color="#17054B"
      >
        <v-container>
          <v-row justify="center">
            <v-col>
              <v-toolbar
                floating
                color="#17054B"
                flat
                class="white--text"
              >
                <img :src="require('@/assets/logo.png')" class="mr-3" height="40">
                <v-toolbar-title
                  class="mr-5"
                >
                  <span class="font-weight-black">LTO</span> Explorer
                </v-toolbar-title>

                <v-toolbar-items
                  v-for="(link, i) in links"
                  :key="i"
                >
                  <v-btn
                    :to="link.to"
                    class="white--text"
                    text
                    small
                    style="text-transform: lowercase;"
                  >
                    <v-icon class="mr-2">
                      {{ link.icon }}
                    </v-icon>

                    {{ link.title }}
                  </v-btn>
                </v-toolbar-items>

                <v-toolbar-items
                  v-for="(ext_link, i) in ext_links"
                  :key="i"
                >
                  <v-btn
                    :href="ext_link.to"
                    class="white--text"
                    text
                    small
                    style="text-transform: lowercase;"
                  >
                    {{ ext_link.title }}
                    <v-icon class="mr-1" x-small>
                      {{ ext_link.icon }}
                    </v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
            </v-col>
          </v-row>
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
      </v-toolbar>
      <v-container>
        <v-card
          style="margin-top: -35px;"
        >
          <v-card-text>
            <v-row
              dense
            >
              <v-col
                cols="3"
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.nodes') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="subtitle-2mb-0"
                >
                  {{ panel.nodes }}
                </h2>
              </v-col>
              <v-col
                cols="3"
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.staked') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ panel.staked }}
                </h2>
              </v-col>
              <v-col
                cols="3"
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.price') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ panel.price }}
                </h2>
              </v-col>
              <v-col
                cols="3"
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.market') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ panel.market }}
                </h2>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      links: [
        {
          title: this.$t('menu.overview'),
          icon: 'mdi-cube-outline',
          to: '/overview'
        },
        {
          title: this.$t('menu.nodes'),
          icon: 'mdi-layers',
          to: '/nodes'
        },
        {
          title: this.$t('menu.distribution'),
          icon: 'mdi-chart-donut',
          to: '/distribution'
        }
      ],
      ext_links: [
        {
          title: this.$t('menu.wallet'),
          icon: 'mdi-arrow-top-right',
          to: 'https://wallet.lto.network'
        }
      ],
      panel: {
        nodes: 55,
        staked: 450000,
        price: 0.04,
        market: 5000000
      }
    }
  },
  computed: {
    locales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

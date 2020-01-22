<template>
  <v-footer
    color="#17054B"
    min-height="250px"
    tile
    flat
  >
    <v-container>
      <v-row>
        <v-col
          sm="6"
          md="4"
          lg="4"
        >
          <v-toolbar-title class="mr-5 white--text" style="text-transform: uppercase;">
            <img :src="require('@/assets/logo.png')" class="mr-3" height="30" style="margin-bottom:-7px;">
            <span class="font-weight-black">LTO</span> Explorer
          </v-toolbar-title>

          <v-divider class="pb-10" />

          <v-select
            :items="locales"
            dark
            label="Langauge"
            prepend-icon="mdi-earth"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item
                v-bind="attrs"
                v-on="on"
                :key="item.code"
                :to="switchLocalePath(item.code)"
                tag="nuxt-link"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.name"
                  />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
        <v-col
          sm="6"
          md="3"
          lg="3"
        >
          <span
            class="font-weight-medium white--text ml-4"
          >{{ $t('footer.links') }}</span>

          <v-list color="#17054B" flat dense>
            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :href="link.href"
            >
              <v-list-item-content>
                <v-list-item-title style="color:#C3CDD6;">
                  {{ link.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col
          s
          sm="6"
          md="3"
          lg="3"
        >
          <span
            class="font-weight-medium white--text ml-4"
          >{{ $t('footer.resources') }}</span>

          <v-list
            color="#17054B"
            flat
            dense
          >
            <v-list-item
              v-for="(resource, i) in resources"
              :key="i"
              :href="resource.href"
            >
              <v-list-item-content>
                <v-list-item-title style="color:#C3CDD6;">
                  {{ resource.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col
          sm="6"
          md="2"
          lg="2"
        >
          <span
            class="font-weight-medium white--text ml-4"
          >{{ $t('footer.social') }}</span>

          <v-list
            color="#17054B"
            flat
            dense
          >
            <v-list-item
              v-for="(social, i) in socials"
              :key="i"
              :href="social.href"
            >
              <v-list-item-content>
                <v-list-item-title style="color:#C3CDD6;">
                  {{ social.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {
          name: this.$t('links.wallet'),
          href: 'https://wallet.lto.network'
        },
        {
          name: this.$t('links.home'),
          href: 'https://lto.network'
        },
        {
          name: this.$t('links.blog'),
          href: 'https://blog.lto.network'
        }
      ],
      resources: [
        {
          name: this.$t('resources.api'),
          href: 'https://api.lto.cloud'
        },
        {
          name: this.$t('resources.support'),
          href: 'https://t.me/ltotech'
        },
        {
          name: this.$t('resources.github'),
          href: 'https://github.com/ltonetwork/'
        }
      ],
      socials: [
        {
          name: 'Twitter',
          href: 'https://twitter.com/ltonetwork'
        },
        {
          name: 'Telegram',
          href: 'https://t.me/LTOnetwork'
        },
        {
          name: 'Reddit',
          href: 'https://www.reddit.com/r/LTONetwork'
        }
      ]
    }
  },
  computed: {
    locales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

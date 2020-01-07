<template>
  <v-footer
    color="#17054B"
    height="250px"
    max-height="250px"
    tile
    flat
    app
  >
    <v-container>
      <v-row>
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
          </v-toolbar>
        </v-col>
        <v-col>
          <span
            class="font-weight-medium white--text ml-4"
          >{{ $t('footer.links') }}</span>

          <v-list
            color="#17054B"
            flat
            dense
          >
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

        <v-col>
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

        <v-col>
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

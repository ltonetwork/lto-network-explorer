<template>
  <v-footer
    color="#17054B"
    min-height="250px"
    tile
    flat
  >
    <v-container class="hidden-sm-and-down">
      <v-row>
        <v-col
          :cols="12"
          :sm="6"
          :md="4"
          :lg="4"
        >
          <v-toolbar-title class="mr-5 white--text" style="text-transform: uppercase; font-size:1.6rem;">
            <img :src="require('@/assets/logo.png')" class="mr-3" height="30" style="margin-bottom:-7px;">
            <span class="font-weight-black">LTO</span> Explorer
          </v-toolbar-title>
        </v-col>
        <v-col
          :cols="12"
          :sm="6"
          :md="3"
          :lg="3"
        >
          <span class="font-weight-medium white--text ml-4">{{ $t('footer.links') }}</span>

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
          :cols="12"
          :sm="6"
          :md="3"
          :lg="3"
        >
          <span class="font-weight-medium white--text ml-4">{{ $t('footer.resources') }}</span>

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
          :cols="12"
          :sm="6"
          :md="2"
          :lg="2"
        >
          <span class="font-weight-medium white--text ml-4">{{ $t('footer.social') }}</span>

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

    <v-container class="hidden-md-and-up text-center">
      <v-row>
        <v-col
          :cols="12"
          :sm="6"
          :md="4"
          :lg="4"
        >
          <v-toolbar-title class="mr-5 white--text" style="text-transform: uppercase;">
            <img :src="require('@/assets/logo.png')" class="mr-3" height="30" style="margin-bottom:-7px;">
            <span class="font-weight-black">LTO</span> Explorer
          </v-toolbar-title>
        </v-col>
        <v-col
          :cols="12"
          :sm="6"
          :md="3"
          :lg="3"
        >
          <v-btn
            v-for="(link, i) in links"
            :key="i"
            :href="link.href"
            text
            block
            class="white--text"
          >
            {{ link.name }}
          </v-btn>
        </v-col>

        <v-col
          :cols="12"
          :sm="6"
          :md="3"
          :lg="3"
        >
          <v-btn
            v-for="(resource, i) in resources"
            :key="i"
            :href="resource.href"
            text
            block
            class="white--text"
          >
            {{ resource.name }}
          </v-btn>
        </v-col>

        <v-col
          :cols="12"
          :sm="6"
          :md="2"
          :lg="2"
        >
          <v-btn
            v-for="(social, i) in socials"
            :key="i"
            :href="social.href"
            text
            block
            class="white--text"
          >
            {{ social.name }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
  import { translate } from '~/plugins/translate'

  interface Link {
    name: string;
    href: string;
  }

  interface FooterLinks {
    links: Link[];
    resources: Link[];
    socials: Link[];
  }

  interface Locale {
    name: string;
    code: string;
    iso: string;
    file: string;
  }

  export default {
    data(): FooterLinks {
      return {
        links: [
          {
            name: translate('links.wallet'),
            href: process.env.WALLET_LINK!
          },
          {
            name: translate('links.home'),
            href: 'https://ltonetwork.com/'
          },
          {
            name: translate('links.source'),
            href: 'https://lto.tools/'
          }
        ],
        resources: [
          {
            name: translate('resources.api'),
            href: 'https://nodes.lto.network'
          },
          {
            name: translate('resources.documentation'),
            href: 'https://docs.ltonetwork.com/'
          },
          {
            name: translate('resources.support'),
            href: 'https://t.me/ltotech'
          },
          {
            name: translate('resources.github'),
            href: 'https://github.com/ltonetwork/'
          }
        ],
        socials: [
          {
            name: 'Twitter',
            href: 'https://twitter.com/theltonetwork'
          },
          {
            name: 'Blog',
            href: 'https://blog.ltonetwork.com/'
          },
          {
            name: 'Reddit',
            href: 'https://www.reddit.com/r/LTONetwork'
          }
        ]
      }
    }
  }
</script>

<template>
  <div>
    <v-row>
      <v-col
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card class="mt-n12">
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-block" />
            {{ $t('block.title') }} #{{ height | parseString }}
          </v-card-title>
          <v-card-text class="pa-0">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.timestamp') }}
                    </td>
                    <td>{{ block.timestamp | parseTime }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.generator') }}
                    </td>
                    <td>
                      <nuxt-link :to="{ path: '/address/' + block.generator }">
                        {{ block.generator }}
                      </nuxt-link>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.signature') }}
                    </td>
                    <td>{{ block.signature }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.reference') }}
                    </td>
                    <td>{{ block.reference }}</td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.tx') }}
                    </td>
                    <td>{{ block.transactionCount | parseString }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.size') }}
                    </td>
                    <td>{{ block.blocksize }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.version') }}
                    </td>
                    <td>{{ block.version }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('transaction.title') }}

            <v-spacer />

            <div style="width:100px;">
              <span class="body-2 grey--text mb-3 mr-2">{{ $t('explorer.type') }}</span>

              <v-select
                v-model="txType"
                label="All"
                :items="txFilter"
                outlined
                single-line
                cache-items
                color="secondary"
                item-color="secondary"
                multiple
                dense
                class="body-2 pa-0 ma-0"
              />
            </div>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="txTable"
              :items="filteredItems"
              :sort-by="['timestamp']"
              :sort-desc="[true]"
              :items-per-page="10"
              :footer-props="{'items-per-page-options': [10, 50, 100, -1]}"
              no-data-text="this block does not contain any transactions"
            >
              <template v-slot:header.type="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.id="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.sender="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.fee="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.timestamp="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:item.type="{ item }">
                {{ name(item.type) }}
              </template>

              <template v-slot:item.id="{ item }">
                <nuxt-link :to="{ path: '/transaction/' + item.id }" class="d-inline-block primary--text">
                  {{ item.id | truncateString }}
                </nuxt-link>
              </template>

              <template v-slot:item.sender="{ item }">
                <nuxt-link :to="{ path: '/address/' + item.sender }" class="d-inline-block primary--text">
                  {{ item.sender | truncateString }}
                </nuxt-link>
              </template>

              <template v-slot:item.fee="{ item }">
                {{ item.fee | parseAtomic | parseNumber }}
              </template>

              <template v-slot:item.timestamp="{ item }">
                {{ item.timestamp | parseTime }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import '@nuxtjs/axios'
  import * as _ from 'lodash'
  import { Block } from '../types'
  import { txTypes as typeMap } from '../../data/map'
  import { translate } from '~/plugins/translate'

  @Component({
    head() {
      return {
        title: translate('block.title') + ' #' + (this as any).height.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      }
    },
    computed: {
      filteredItems(): string {
        return (this as any).block.transactions.filter((i: any) => {
          return (this as any).txTypeFilter(i.type)
        })
      }
    },
    validate({ params }): boolean {
      return !isNaN(Number(params.block))
    },
    async asyncData({ $axios, params }) {
      const block: Block = await $axios.$get(process.env.LB_API + '/blocks/at/' + params.block, {
        timeout: Number(process.env.AXIOS_TIMEOUT)
      })

      return {
        block
      }
    }
  })

  class Blocks extends Vue {
    height = (this as any).$nuxt.$route.params.block
    txTable = [
      {
        text: 'Type',
        align: 'left',
        value: 'type'
      },
      {
        text: 'ID',
        align: 'left',
        value: 'id'
      },
      {
        text: 'Sender',
        align: 'left',
        value: 'sender'
      },
      {
        text: 'Fee',
        align: 'right',
        value: 'fee'
      },
      {
        text: 'Timestamp',
        align: 'right',
        value: 'timestamp'
      }
    ]

    txFilter = [
      { text: 'Anchor', value: [15, 22] },
      { text: 'Association', value: [16, 17] },
      { text: 'Statement', value: 23 },
      { text: 'Transfer', value: 4 },
      { text: 'Mass transfer', value: 11 },
      { text: 'Burn', value: 21 },
      { text: 'Lease', value: [8, 9] },
      { text: 'Sponsorship', value: [17, 18] },
      { text: 'Register', value: 20 },
      { text: 'Script', value: 13 },
      { text: 'Genesis', value: 1 }
    ]

    txType: Array<number> = []

    txTypeFilter(type: number): boolean {
      const types = this.txType.flat()
      return types.length === 0 || _.includes(types, type)
    }

    name(value: number): string {
      return typeMap[value]?.description || 'Unknown'
    }

    icon(value: number): string {
      return typeMap[value]?.icon || 'mdi-help-circle-outline'
    }
  }

  export default Blocks
</script>

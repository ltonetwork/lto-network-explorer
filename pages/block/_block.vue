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
              no-data-text="this block does not contain any transactions"
            >
              <template v-slot:header.type="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.id="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.timestamp="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.sender="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.fee="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:item.type="{ item }">
                {{ name(item.type) }}
              </template>

              <template v-slot:item.id="{ item }">
                <nuxt-link :to="{ path: '/transaction/' + item.id }" class="d-inline-block primary--text text-truncate" style="max-width: 26vh;">
                  {{ item.id }}
                </nuxt-link>
              </template>

              <template v-slot:item.timestamp="{ item }">
                 {{ item.timestamp | parseTime }}
              </template>

              <template v-slot:item.sender="{ item }">
                <nuxt-link :to="{ path: '/address/' + item.sender }" class="d-inline-block primary--text text-truncate" style="max-width: 26vh;">
                  {{ item.sender }}
                </nuxt-link>
              </template>

              <template v-slot:item.fee="{ item }">
                {{ item.fee | parseAtomic | parseNumber }}
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
import { translate } from '../../plugins/translate'
import { Block, Transaction } from '../types'

@Component({
  head () {
    return {
      title: translate('block.title') + ' #' + (this as any).height.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    }
  },
  computed: {
    filteredItems (): string {
      return (this as any).block.transactions.filter((i: any) => {
        return !(this as any).txType || _.includes((this as any).txType, i.type) || ((this as any).txType! as any).length === 0
      })
    }
  },
  validate ({ params }): boolean {
    return !isNaN(Number(params.block))
  },
  async asyncData ({ $axios, params }) {
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
      text: 'Timestamp',
      align: 'right',
      value: 'timestamp'
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
    }
  ]

  txFilter = [
    { text: 'Genesis', value: 1 },
    { text: 'Transfer', value: 4 },
    { text: 'Lease', value: 8 },
    { text: 'Cancel Lease', value: 9 },
    { text: 'Mass Transfer', value: 11 },
    { text: 'Script', value: 13 },
    { text: 'Anchor', value: 15 }
  ]

  txType = null

  name (value: number): string {
    // Genesis Transfer
    if (value === 1) {
      return 'Genesis'
    } else if (value === 4) {
    // Transfer
      return 'Transfer'
    } else if (value === 8) {
    // Lease
      return 'Lease'
    } else if (value === 9) {
      // Cancel Lease
      return 'Cancel Lease'
    } else if (value === 11) {
      // Mass Transfer
      return 'Mass Transfer'
    } else if (value === 13) {
      // Set Script
      return 'Script'
    } else if (value === 15) {
      // Anchor
      return 'Anchor'
    } else { return 'light' }
  }

  icon (value: number): string {
    // Genesis Transfer
    if (value === 1) {
      return 'mdi-power'
    } else if (value === 4) {
    // Transfer
      return 'mdi-send'
    } else if (value === 8) {
    // Lease
      return 'mdi-file-document-box-plus'
    } else if (value === 9) {
      // Cancel Lease
      return 'mdi-file-document-box-remove'
    } else if (value === 11) {
      // Mass Transfer
      return 'mdi-coins'
    } else if (value === 13) {
      // Set Script
      return 'mdi-script-text'
    } else if (value === 15) {
      // Anchor
      return 'mdi-anchor'
    } else { return 'Unknown' }
  }
}

export default Blocks
</script>

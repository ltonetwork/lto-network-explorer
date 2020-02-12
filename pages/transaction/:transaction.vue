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
            <span class="mr-2 lto-transfer" />
            {{ $t('transaction.title') }}
          </v-card-title>
          <v-card-text class="pa-0">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.id') }}
                    </td>
                    <td>{{ transaction.id }}</td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.type') }}
                    </td>
                    <td>{{ name(transaction.type) }} (Type {{ transaction.type }})</td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.timestamp') }}
                    </td>
                    <td>{{ transaction.timestamp | parseTime }}</td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.block') }}
                    </td>
                    <td>
                      <nuxt-link :to="{ path: '/block/' + transaction.height }">
                        {{ transaction.height | parseString }}
                      </nuxt-link>
                    </td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.sender') }}
                    </td>
                    <td>
                      <nuxt-link :to="{ path: '/address/' + transaction.sender }">
                        {{ transaction.sender }}
                      </nuxt-link>
                    </td>
                  </tr>

                  <tr v-show="transaction.type === 11">
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.recipient') }}
                    </td>
                    <td>
                      <nuxt-link v-if="transaction.recipient" :to="{ path: '/address/' + transaction.recipient }">
                        {{ transaction.recipient }}
                      </nuxt-link>

                      <span v-if="!transaction.recipient">N/A</span>
                    </td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.amount') }}
                    </td>
                    <td>
                      {{ transaction.amount | parseAtomic | parseNumber }}
                    </td>
                  </tr>
                  <tr /><tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.fee') }}
                    </td>
                    <td>
                      {{ transaction.fee | parseAtomic | parseNumber }}
                    </td>
                  </tr>
                  <tr v-if="transaction.type === 11">
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.signature') }}
                    </td>
                    <td>
                      <span v-if="transaction.signature">{{ transaction.signature }}</span>
                      <span v-if="!transaction.signature">N/A</span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="transaction.type === 11 "
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('transaction.title') }}(s)
          </v-card-title>
          <v-card-text class="pa-0">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="overline grey--text text-left">
                      Recipient
                    </th>
                    <th class="overline grey--text text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tx, i) in transaction.transfers" :key="i">
                    <td>
                      <nuxt-link :to="{ path: '/address/' + tx.recipient }" class="d-inline-block primary--text text-truncate" style="max-width: 95%;">
                        {{ tx.recipient }}
                      </nuxt-link>
                    </td>
                    <td class="text-right">
                      {{ tx.amount | parseAtomic | parseNumber }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="valid"
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card class="green dark">
          <v-card-text class="pa-3">
            <v-row>
              <v-col
                :cols="4"
                :sm="2"
                :md="2"
                :lg="2"
              >
                <v-icon style="font-size:5rem;" class="mt-2">
                  mdi-check
                </v-icon>
              </v-col>
              <v-col
                :cols="8"
                :sm="10"
                :md="10"
                :lg="10"
              >
                <div class="headline font-weight-bold">
                  {{ $t('transaction.valid') }}
                </div>
                <div class="title">
                  {{ hash }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="invalid"
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card class="red dark">
          <v-card-text class="pa-3">
            <v-row>
              <v-col
                :cols="4"
                :sm="2"
                :md="2"
                :lg="2"
              >
                <v-icon style="font-size:5rem;" class="mt-2">
                  mdi-close
                </v-icon>
              </v-col>
              <v-col
                :cols="8"
                :sm="10"
                :md="10"
                :lg="10"
              >
                <div class="headline font-weight-bold">
                  {{ $t('transaction.invalid') }}
                </div>
                <div class="title">
                  {{ hash }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="transaction.type === 15 "
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-anchor" />
            {{ $t('transaction.anchors') }}
          </v-card-title>
          <v-card-text>
            <div v-for="(anchor, i) in transaction.anchors " :key="i" class="secondary--text">
              {{ anchor }}
            </div>
            <div style="width:300px">
              <v-select
                v-model="encodeAnchor"
                cache-items
                :items="['hex', 'base58','base64']"
                value="hex"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import moment from 'moment'
import '@nuxtjs/axios'
import baseX from 'base-x'
import { Transfer, Transaction } from '../types'
const bs58 = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

@Component({
  components: {
  },
  validate (/* { params } */): boolean {
    // return !isNaN(params.address)
    return true
  },
  async asyncData ({ $axios, params }) {
    const transaction: Transaction = await $axios.$get(process.env.LB_API + '/transactions/info/' + params.transaction, {
      timeout: Number(process.env.AXIOS_TIMEOUT)
    })

    if (transaction.type === 8 || transaction.type === 9 || transaction.type === 1 || transaction.type === 15) {
      transaction.amount = 0
    }

    return {
      transaction
    }
  }
})

class Transactions extends Vue {
  transaction = (this as any).$nuxt.$route.params.transaction
  hash = (this as any).$nuxt.$route.query.hash
  valid = false
  invalid = false

  created (): void {
    if (this.hash) {
      // Validate

      this.invalid = true
    }
  }

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
      // `Set Script
      return 'Script'
    } else if (value === 15) {
      // Anchor
      return 'Anchor'
    } else { return 'light' }
  }
}

export default Transactions
</script>

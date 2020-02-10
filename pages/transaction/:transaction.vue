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

                  <tr v-show="!mass">
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
                  <tr v-show="!mass">
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
        v-show="mass"
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
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import moment from 'moment'
import '@nuxtjs/axios'
import { Transfer, Transaction } from '../types'

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

    transaction.fee = Number(transaction.fee) / Number(process.env.ATOMIC)

    // If mass transfer
    let mass = false

    if (transaction.type === 11) {
      mass = true
      transaction.amount = transaction.totalAmount / Number(process.env.ATOMIC)

      transaction.transfers.forEach((tx: Transfer) => {
        tx.amount = tx.amount / Number(process.env.ATOMIC)
      })
    } else if (transaction.type === 8 || transaction.type === 9 || transaction.type === 1 || transaction.type === 15) {
      transaction.amount = 0
    }

    return {
      mass,
      transaction
    }
  }
})

class Transactions extends Vue {
  transaction = (this as any).$nuxt.$route.params.transaction

  mass = false

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
}

export default Transactions
</script>

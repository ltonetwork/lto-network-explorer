<template>
  <div>
    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card class="mt-n12">
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('transaction.title') }}
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>{{ $t('explorer.id') }}</td>
                    <td>{{ transaction.id }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('explorer.type') }}</td>
                    <td>{{ name(transaction.type) }} (Type {{ transaction.type }})</td>
                  </tr>

                  <tr>
                    <td>{{ $t('explorer.timestamp') }}</td>
                    <td>{{ transaction.timestamp }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('explorer.block') }}</td>
                    <td>
                      <nuxt-link :to="{ path: '/block/' + transaction.height }">
                        {{ transaction.height }}
                      </nuxt-link>
                    </td>
                  </tr>

                  <tr>
                    <td>{{ $t('explorer.sender') }}</td>
                    <td>
                      <nuxt-link :to="{ path: '/address/' + transaction.sender }">
                        {{ transaction.sender }}
                      </nuxt-link>
                    </td>
                  </tr>

                  <tr v-show="!mass">
                    <td>{{ $t('explorer.recipient') }}</td>
                    <td>
                      <nuxt-link :to="{ path: '/address/' + transaction.recipient }">
                        {{ transaction.recipient }}
                      </nuxt-link>
                    </td>
                  </tr>

                  <tr>
                    <td>{{ $t('explorer.amount') }}</td>
                    <td>
                      {{ transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }) }}
                    </td>
                  </tr>
                  <tr /><tr>
                    <td>{{ $t('explorer.fee') }}</td>
                    <td>
                      {{ transaction.fee.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }) }}
                    </td>
                  </tr>
                  <tr v-show="!mass">
                    <td>{{ $t('explorer.signature') }}</td>
                    <td>{{ transaction.signature }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-show="mass">
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('transaction.title') }}s
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Recipient
                    </th>
                    <th class="text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tx, i) in transaction.transfers" v-bind:key="i">
                    <td>
                      <nuxt-link :to="{ path: '/address/' + tx.recipient }">
                        {{ t.recipient }}
                      </nuxt-link>
                    </td>
                    <td class="text-right">
                      {{ tx.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }) }}
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

<script>
import moment from 'moment'

export default {
  components: {
  },
  data () {
    return {
      transaction: this.$route.params.transaction,
      mass: false
    }
  },
  validate ({ params }) {
    // return !isNaN(params.address)
    return true
  },
  async asyncData ({ $axios, params }) {
    const transaction = await $axios.$get(process.env.LB_API + '/transactions/info/' + params.transaction, {
      timeout: process.env.AXIOS_TIMEOUT
    })

    transaction.timestamp = moment(transaction.timestamp).format('DD-MM-YY HH:MM:SS')
    transaction.fee = (transaction.fee / process.env.ATOMIC)

    // If mass transfer
    let mass = false

    if (transaction.type === 11) {
      mass = true
      transaction.amount = transaction.totalAmount

      transaction.transfers.forEach((tx) => {
        tx.amount = (tx.amount / process.env.ATOMIC)
      })
    } else if (transaction.type === 8 || transaction.type === 9 || transaction.type === 1 || transaction.type === 15) {
      transaction.amount = 0
    }

    return {
      mass,
      transaction
    }
  },
  methods: {
    name (value) {
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
}
</script>

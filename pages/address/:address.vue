<template>
  <div>
    <v-snackbar v-model="copied">
      {{ $t('address.copied') }}
      <v-btn
        @click="copied = false"
        color="red"
        text
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text mt-n12">
            {{ $t('address.wallet') }}
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-3" />
            {{ $t('address.title') }}

            <br>

            <span class="subtitle-1" style="color:#1a004b;">{{ address }}</span>

            <v-btn
              v-clipboard:copy="address"
              v-clipboard:success="copy"
              text
              icon
              style="font-size:22px;"
            >
              <span class="lto-copy" />
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            {{ $t('address.balance.title') }}
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-1" />

            <v-row>
              <v-col
                xs="12"
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.regular') }}</span>
                    <v-icon v-on="on" small class="ml-1 grey--text">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  {{ $t('address.tooltips.regular') }}
                </v-tooltip>

                <p class="title font-weight-bold secondary--text mt-2">
                  {{ balance.regular.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </p>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.generating') }}</span>
                    <v-icon v-on="on" small class="ml-1 grey--text">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  {{ $t('address.tooltips.generating') }}
                </v-tooltip>
                <p class="title font-weight-bold secondary--text mt-2">
                  {{ balance.generating.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </p>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.available') }}</span>
                    <v-icon v-on="on" small class="ml-1 grey--text">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  {{ $t('address.tooltips.available') }}
                </v-tooltip>
                <p class="title font-weight-bold secondary--text mt-2">
                  {{ balance.available.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </p>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.effective') }}</span>
                    <v-icon v-on="on" small class="ml-1 grey--text">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  {{ $t('address.tooltips.effective') }}
                </v-tooltip>
                <p class="title font-weight-bold secondary--text mt-2">
                  {{ balance.effective.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('address.transactions') }}
          </v-card-title>
          <v-card-text class="pt-0">
            <v-data-table
              :headers="txTable"
              :items="transactions"
              :sort-by="['timestamp']"
              :sort-desc="[false]"
              :items-per-page="10"
              no-data-text="this block does not contain any transactions"
              class="secondary--text"
            >
              <template v-slot:header.type="{ header }">
                <span class="font-weight-regular grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.id="{ header }">
                <span class="font-weight-regular grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.sender="{ header }">
                <span class="font-weight-regular grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.recipient="{ header }">
                <span class="font-weight-regular grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.fee="{ header }">
                <span class="font-weight-regular grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.timestamp="{ header }">
                <span class="font-weight-regular grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.label="{ header }">
                <span class="font-weight-regular grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:item.type="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" color="secondary">
                      {{ icon(item.type) }}
                    </v-icon>
                  </template>
                  {{ name(item.type) }}
                </v-tooltip>
              </template>

              <template v-slot:item.id="{ item }">
                <nuxt-link :to="{ path: '/transaction/' + item.id }" class="d-inline-block primary--text text-truncate" style="max-width: 26vh;">
                  {{ item.id }}
                </nuxt-link>
              </template>

              <template v-slot:item.sender="{ item }">
                <nuxt-link :to="{ path: '/address/' + item.sender }" class="d-inline-block primary--text text-truncate" style="max-width: 26vh;">
                  {{ item.sender }}
                </nuxt-link>
              </template>

              <template v-slot:item.recipient="{ item }">
                <nuxt-link v-if="item.recipient" :to="{ path: '/address/' + item.recipient }" class="d-inline-block primary--text text-truncate" style="max-width: 26vh;">
                  {{ item.recipient }}
                </nuxt-link>
                <span v-if="!item.recipient">N/A</span>
              </template>

              <template v-slot:item.fee="{ item }">
                {{ item.fee.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) }}
              </template>

              <template v-slot:item.timestamp="{ item }">
                {{ item.timestamp }}
              </template>

              <template v-slot:item.label="{ item }">
                <v-btn
                  :color="color(item.label)"
                  outlined
                  dark
                  small
                  style="width:30px;"
                  class="text-center"
                >
                  {{ item.label }}
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions />
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
      address: this.$route.params.address,
      copied: false,
      balance: null,
      txTable: [
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
          text: 'Recipient',
          align: 'left',
          value: 'recipient'
        },
        {
          text: 'Fee',
          align: 'right',
          value: 'fee'
        },
        {
          text: 'Timestamp',
          align: 'center',
          value: 'timestamp'
        },
        {
          text: 'I / O',
          align: 'center',
          value: 'label'
        }
      ]
    }
  },
  validate ({ params }) {
    // return !isNaN(params.address)
    return true
  },
  async asyncData ({ $axios, params }) {
    // Pagination still needs to be implemented osible that a store
    // may be required due to many transactions linked to active
    // addresses

    // eg: https://codepen.io/paulpv/pen/zWPKao

    // required: method to get total sum of transactions linked to the
    // an address in order to determine the `limit` parameter.

    const balance = await $axios.$get(process.env.LB_API + '/addresses/balance/details/' + params.address, {
      timeout: process.env.AXIOS_TIMEOUT
    })

    balance.regular = balance.regular / process.env.ATOMIC
    balance.generating = balance.generating / process.env.ATOMIC
    balance.available = balance.available / process.env.ATOMIC
    balance.effective = balance.effective / process.env.ATOMIC

    let transactions = await $axios.$get(process.env.LB_API + '/transactions/address/' + params.address + '/limit/100', {
      timeout: process.env.AXIOS_TIMEOUT
    })

    transactions = transactions[0]

    if (transactions.length >= 1) {
      transactions.forEach((tx) => {
        tx.timestamp = moment(tx.timestamp).format('DD-MM-YY HH:MM:SS')
        tx.fee = (tx.fee / process.env.ATOMIC)

        if (tx.sender === params.address) {
          tx.label = 'out'
        } else if (tx.recipient === params.address) {
          tx.label = 'in'
        } else {
          tx.label = 'out' // Mass Tx
        }
      })
    }
    return {
      balance,
      transactions
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
    },
    color (value) {
      if (value === 'out') {
        return 'orange'
      } else if (value === 'in') {
        return 'green'
      }
    },
    icon (value) {
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
    },
    copy () {
      this.copied = true
    }
  }
}
</script>

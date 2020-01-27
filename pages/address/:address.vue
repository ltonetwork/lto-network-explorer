<template>
  <div>
    <v-snackbar
      v-model="copied"
    >
      {{ $t('address.copied') }}

      <v-btn
        @click="snackbar = false"
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
          <v-card-title class="headline mt-n12" style="color:#1a004b;">
            {{ $t('address.wallet') }}
          </v-card-title>
          <v-card-text>
            <span class="">
              {{ $t('address.title') }}
            </span>

            <br>

            <span class="subtitle-2" style="color:#1a004b;">{{ address }}</span>

            <v-btn
              v-clipboard:copy="address"
              v-clipboard:success="copy"
              text
              icon
              color="mdi-clipboard"
            >
              <v-icon>mdi-clipboard</v-icon>
            </v-btn>
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
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('address.balance.title') }}
          </v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.regular') }}</span>
                    <v-icon v-on="on" small class="ml-1">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span class="caption mt-0 mb-2">
                    {{ $t('address.tooltips.regular') }}
                  </span>
                </v-tooltip>

                <h2
                  style="color:#1a004b;"
                  class="subtitle-2mb-0"
                >
                  {{ balance.regular.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </h2>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.generating') }}</span>
                    <v-icon v-on="on" small class="ml-1">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span class="caption mt-0 mb-2">
                    {{ $t('address.tooltips.generating') }}
                  </span>
                </v-tooltip>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ balance.generating.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </h2>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.available') }}</span>
                    <v-icon v-on="on" small class="ml-1">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span class="caption mt-0 mb-2">
                    {{ $t('address.tooltips.available') }}
                  </span>
                </v-tooltip>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ balance.available.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </h2>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span>{{ $t('address.balance.effective') }}</span>
                    <v-icon v-on="on" small class="ml-1">
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span class="caption mt-0 mb-2">
                    {{ $t('address.tooltips.effective') }}
                  </span>
                </v-tooltip>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ balance.effective.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </h2>
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
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('address.transactions') }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="txTable"
              :items="transactions"
              :sort-by="['timestamp']"
              :sort-desc="[false]"
              :items-per-page="10"
              no-data-text="this block does not contain any transactions"
            >
              <template v-slot:item.label="{ item }">
                <v-chip :color="color(item.label)" label outlined dark>
                  {{ item.label }}
                </v-chip>
              </template>

              <template v-slot:item.type="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-chip :color="color(item.type)" v-on="on" label outlined dark>
                      <v-icon small>
                        {{ icon(item.type) }}
                      </v-icon>
                    </v-chip>
                  </template>
                  <span>{{ name(item.type) }}</span>
                </v-tooltip>
              </template>

              <template v-slot:item.id="{ item }">
                <nuxt-link :to="{ path: '/transaction/' + item.id }">
                  {{ item.id }}
                </nuxt-link>
              </template>

              <template v-slot:item.label="{ item }">
                <v-chip color="primary" label outlined dark>
                  {{ item.label }}
                </v-chip>
              </template>

              <template v-slot:item.sender="{ item }">
                <nuxt-link :to="{ path: '/address/' + item.sender }">
                  {{ item.sender }}
                </nuxt-link>
              </template>

              <template v-slot:item.recipient="{ item }">
                <nuxt-link :to="{ path: '/address/' + item.recipient }">
                  {{ item.recipient }}
                </nuxt-link>
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
          text: 'I/O',
          align: 'center',
          value: 'label'
        },
        {
          text: 'ID',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Type',
          align: 'center',
          value: 'type'
        },
        {
          text: 'Sender',
          align: 'center',
          value: 'sender'
        },
        {
          text: 'Recipient',
          align: 'center',
          value: 'recipient'
        },
        {
          text: 'Fee',
          align: 'center',
          value: 'fee'
        },
        {
          text: 'Timestamp',
          align: 'right',
          value: 'timestamp'
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
      // Genesis Transfer
      if (value === 1) {
        return 'primary'
      } else if (value === 4) {
      // Transfer
        return '#9fd0da'
      } else if (value === 8) {
      // Lease
        return '#877abc'
      } else if (value === 9) {
        // Cancel Lease
        return '#e17abd'
      } else if (value === 11) {
        // Mass Transfer
        return '#4f7279'
      } else if (value === 13) {
        // Set Script
        return '#b18383'
      } else if (value === 15) {
        // Anchor
        return '#c098d1'
      } else if (value === 'out') {
        // Anchor
        return 'orange'
      } else if (value === 'in') {
        // Anchor
        return 'green'
      } else { return 'light' }
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

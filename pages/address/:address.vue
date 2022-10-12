<template>
  <div>
    <v-snackbar v-model="copied">
      {{ $t('address.copied') }}
      <v-btn
        color="red"
        text
        @click="copied = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-row>
      <v-col
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text mt-n12">
            {{ $t('address.wallet') }}
          </v-card-title>
          <v-card-text class="pl-0 pr-0">
            <v-divider class="mb-3" />

            <span class="overline pl-6">{{ $t('address.title') }}</span>
            <br>
            <span class="subtitle-1 pl-6 secondary--text">{{ address }}</span>

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
        :cols="12"
        :sm="6"
        :md="3"
        :lg="3"
      >
        <v-card>
          <v-card-text>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span class="pa-0 overline" v-text="$t('address.balance.regular')" />
                <v-icon small class="ml-1 grey--text" v-on="on">
                  mdi-help-circle
                </v-icon>
              </template>
              {{ $t('address.tooltips.regular') }}
            </v-tooltip>

            <p class="title font-weight-bold secondary--text mt-2 mb-0">
              {{ balance.regular | parseAtomic | parseNumber }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        :cols="12"
        :sm="6"
        :md="3"
        :lg="3"
      >
        <v-card>
          <v-card-text>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span class="pa-0 overline" v-text="$t('address.balance.unbonding')" />
                <v-icon small class="ml-1 grey--text" v-on="on">
                  mdi-help-circle
                </v-icon>
              </template>
              {{ $t('address.tooltips.unbonding') }}
            </v-tooltip>

            <p class="title font-weight-bold secondary--text mt-2 mb-0">
              {{ balance.unbonding | parseAtomic | parseNumber }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        :cols="12"
        :sm="6"
        :md="3"
        :lg="3"
      >
        <v-card>
          <v-card-text>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span class="pa-0 overline" v-text="$t('address.balance.leasing')" />
                <v-icon small class="ml-1 grey--text" v-on="on">
                  mdi-help-circle
                </v-icon>
              </template>
              {{ $t('address.tooltips.leasing') }}
            </v-tooltip>

            <p class="title font-weight-bold secondary--text mt-2 mb-0">
              {{ Math.max(balance.regular - balance.available - balance.unbonding, 0) | parseAtomic | parseNumber }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        :cols="12"
        :sm="6"
        :md="3"
        :lg="3"
      >
        <v-card>
          <v-card-text>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <span class="pa-0 overline" v-text="$t('address.balance.effective')" />
                <v-icon small class="ml-1 grey--text" v-on="on">
                  mdi-help-circle
                </v-icon>
              </template>
              {{ $t('address.tooltips.effective') }}
            </v-tooltip>

            <p class="title font-weight-bold secondary--text mt-2 mb-0">
              {{ balance.effective | parseAtomic | parseNumber }}
            </p>
          </v-card-text>
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
            {{ $t('address.transactions') }}

            <v-spacer />

            <div style="width:120px;">
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
                dense
                class="body-3 pa-0 ma-0"
                @change="onFilterChange()"
              />
            </div>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-data-table
              :loading="isLoading"
              :headers="txTable"
              :items="transactions"
              :sort-by="['timestamp']"
              :sort-desc="[true]"
              :items-per-page="10"
              :footer-props="{'items-per-page-options': [10, 25, 50]}"
              no-data-text="this block does not contain any transactions"
              class="secondary--text"
              :server-items-length="total"
              :options.sync="options"
            >
              <template v-slot:header.label="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.type="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.id="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.sender="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.recipient="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.amount="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.fee="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
              </template>

              <template v-slot:header.timestamp="{ header }">
                <span class="overline grey--text">{{ header.text }}</span>
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

              <template v-slot:item.type="{ item }">
                {{ name(item.type) }}
              </template>

              <template v-slot:item.id="{ item }">
                <nuxt-link :to="{ path: '/transaction/' + item.id }" class="d-inline-block primary--text">
                  {{ item.id | truncateString }}
                </nuxt-link>
              </template>

              <template v-slot:item.sender="{ item }">
                <nuxt-link v-if="item.sender !== address" :to="{ path: '/address/' + item.sender }" class="d-inline-block primary--text">
                  {{ item.sender | truncateString }}
                </nuxt-link>
                <span v-if="item.sender === address">{{ item.sender | truncateString }}</span>
              </template>

              <template v-slot:item.recipient="{ item }">
                <nuxt-link
                  v-if="item.recipient && item.recipient !== address"
                  :to="{ path: '/address/' + item.recipient }"
                  class="d-inline-block primary--text"
                >
                  {{ item.recipient | truncateString }}
                </nuxt-link>
                <span v-if="item.recipient === address">{{ item.recipient | truncateString }}</span>
                <span v-if="item.type === 11 && item.sender === address">[ {{ item.transfers.length }} addresses ]</span>
                <span v-if="item.type === 11 && item.sender !== address">{{ address | truncateString }}</span>
              </template>

              <template v-slot:item.amount="{ item }">
                <span v-if="'amount' in item">{{ item.amount | parseAtomic | parseNumber }}</span>
                <span v-if="item.type === 11 && item.sender === address">{{ item.transfers.reduce((a, t) => a + parseInt(t.amount), 0) | parseAtomic | parseNumber }}</span>
                <span v-if="item.type === 11 && item.sender !== address">{{ item.transfers.find(t => t.recipient === address)?.amount | parseAtomic | parseNumber }}</span>
              </template>

              <template v-slot:item.fee="{ item }">
                <span v-if="item.type !== 11 || item.sender === address">{{ item.fee | parseAtomic | parseNumber }}</span>
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
  import { Component, Watch } from 'vue-property-decorator'
  import '@nuxtjs/axios'
  import { txTypes as typeMap } from '../../data/map'

  @Component({
    components: {},
    computed: {},
    validate({ params }) {
      // return !isNaN(params.address)
      return true
    },
    async asyncData({ $axios, params }) {
      // Pagination still needs to be implemented possible that a store
      // may be required due to many transactions linked to active
      // addresses

      // eg: https://codepen.io/paulpv/pen/zWPKao

      // required: method to get total sum of transactions linked to the
      // an address in order to determine the `limit` parameter.

      const balance = await $axios.$get(process.env.LB_API + '/addresses/balance/details/' + params.address, {
        timeout: Number(process.env.AXIOS_TIMEOUT)
      })

      return {
        balance
      }
    }
  })

  export default class Address extends Vue {
    address = (this as any).$nuxt.$route.params.address
    copied = false
    balance = null
    transactions = []
    isLoading = false
    total = 0
    options: any = {}
    limit = 10

    async makeRequest() {
      this.isLoading = true
      try {
        const { data, headers } = await this.$axios.get(`${process.env.LB_API}/index/transactions/addresses/${this.address}?${this.queryParameters}`, {
          timeout: Number(process.env.AXIOS_TIMEOUT),
          headers: {
            'Access-Control-Expose-Headers': '*'
          }
        })
        this.total = Number(headers['x-total'])
        this.transactions = data
        if (this.transactions.length > 0) {
          this.transactions.forEach((tx: any) => {
            if (tx.sender === this.address) {
              tx.label = 'out'
            } else {
              tx.label = 'in'
            }
          })
        }
      } catch (e) {
        // Do something
      } finally {
        this.isLoading = false
      }
    }

    get queryParameters() {
      return `offset=${this.offset}&limit=${this.options.itemsPerPage}&type=${this.txType}`
    }

    get offset() {
      return (this.limit * this.options.page) - this.limit
    }

    onFilterChange() {
      this.makeRequest()
    }

    @Watch('options')
    onOptionsChange() {
      this.makeRequest()
    }

    txTable = [
      {
        text: 'I / O',
        align: 'center',
        value: 'label'
      },
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
        text: 'Amount',
        align: 'right',
        value: 'amount'
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
      }
    ]

    txFilter = [
      { text: 'All', value: 'all' },
      { text: 'Anchor', value: 'anchor' },
      { text: 'Association', value: 'association' },
      { text: 'Data', value: 'data' },
      { text: 'Statement', value: 'statement' },
      { text: 'Transfer', value: 'transfer' },
      { text: 'Mass transfer', value: 'mass_transfer' },
      { text: 'Burn', value: 'burn' },
      { text: 'All transfers', value: 'all_transfers' },
      { text: 'Lease', value: 'lease' },
      { text: 'Sponsorship', value: 'sponsor' },
      { text: 'Register', value: 'register' },
      { text: 'Script', value: 'script' },
      { text: 'Genesis', value: 'genesis' }
    ]

    txType = 'all'

    name(value: number): string {
      return typeMap[value]?.description || 'Unknown'
    }

    icon(value: number): string {
      return typeMap[value]?.icon || 'mdi-help-circle-outline'
    }

    color(value: string): string {
      if (value === 'out') {
        return 'orange'
      } else if (value === 'in') {
        return 'green'
      } else {
        return ''
      }
    }

    copy(): void {
      this.copied = true
    }
  }

</script>

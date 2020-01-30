<template>
  <div>
    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card class="mt-n12">
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-block" />
            {{ $t('block.title') }} #{{ blockIndex }}
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>{{ $t('explorer.timestamp') }}</td>
                    <td>{{ block.timestamp }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.generator') }}</td>
                    <td>
                      <nuxt-link :to="{ path: '/address/' + block.generator }">
                        {{ block.generator }}
                      </nuxt-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.signature') }}</td>
                    <td>{{ block.signature }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.reference') }}</td>
                    <td>{{ block.reference }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('explorer.tx') }}</td>
                    <td>{{ block.transactionCount }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.size') }}</td>
                    <td>{{ block.blocksize }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.version') }}</td>
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
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('transaction.title') }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="txTable"
              :items="block.transactions"
              :sort-by="['timestamp']"
              :sort-desc="[false]"
              :items-per-page="10"
              no-data-text="this block does not contain any transactions"
            >
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
                <nuxt-link :to="{ path: '/transaction/' + item.id }" class="d-inline-block primary--text text-truncate" style="max-width: 10vw;">
                  {{ item.id }}
                </nuxt-link>
              </template>

              <template v-slot:item.sender="{ item }">
                <nuxt-link :to="{ path: '/address/' + item.sender }" class="d-inline-block primary--text text-truncate" style="max-width: 10vw;">
                  {{ item.sender }}
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
  head () {
    return {
      title: this.$t('block.title') + ' #' + this.blockIndex
    }
  },
  components: {
  },
  data () {
    return {
      blockIndex: this.$route.params.block,
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
          align: 'center',
          value: 'sender'
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
    return !isNaN(params.block)
  },
  async asyncData ({ $axios, params }) {
    const block = await $axios.$get(process.env.LB_API + '/blocks/at/' + params.block, {
      timeout: process.env.AXIOS_TIMEOUT
    })

    block.timestamp = moment(block.timestamp).format('DD-MM-YY HH:MM:SS')

    if (block.transactions.length >= 1) {
      block.transactions.forEach((tx) => {
        tx.timestamp = moment(tx.timestamp).format('DD-MM-YY HH:MM:SS')
        tx.fee = (tx.fee / process.env.ATOMIC)
      })
    }
    return {
      block
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
    }
  }
}
</script>

<template>
  <div>
    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('address.address') }} #{{ address }}
          </v-card-title>
          <v-card-text>
            <v-row
              dense
            >
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.nodes') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="subtitle-2mb-0"
                >
                  {{ panel.nodes }}
                </h2>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.staked') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ panel.staked }}
                </h2>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.price') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ panel.price }}
                </h2>
              </v-col>
              <v-col
                sm="6"
                md="3"
                lg="3"
              >
                <p class="caption mt-0 mb-2">
                  {{ $t('panel.market') }}
                </p>
                <h2
                  style="color:#1a004b;"
                  class="mb-0"
                >
                  {{ panel.market }}
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
            Transactions
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="txTableHeader"
              :items="getTxs"
            />
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
      address: this.$route.params,
      getBlock: [],
      getTxs: [],
      txTableHeader: [
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
    return !isNaN(params.index)
  },
  // watchQuery: true,
  async asyncData ({ $axios, params }) {
    console.log(params.index)
    // Get address
    const getAddress = await $axios.$get(process.env.CACHE_URL + '/address/' + params.index)

    // Get tx related to
    const getTxs = await $axios.$get(process.env.CACHE_URL + '/transaction/address/' + params.index)

    if (getTxs.length >= 1) {
      getTxs.forEach((tx) => {
        tx.timestamp = moment(tx.timestamp).format('DD-MM-YY HH:MM:SS')
      })
    }
    return {
      getAddress,
      getTxs
    }
  },
  mounted () {
  }
}
</script>

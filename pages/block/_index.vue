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
            {{ $t('block.block') }} #{{ blockIndex }}
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ $t('explorer.timestamp') }}</td>
                    <td>{{ getBlock.timestamp }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.generator') }}</td>
                    <td>
                      <a :href="'/address/' + getBlock.generator">{{ getBlock.generator }}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.signature') }}</td>
                    <td>{{ getBlock.signature }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.reference') }}</td>
                    <td>{{ getBlock.reference }}</td>
                  </tr>

                  <tr>
                    <td>{{ $t('explorer.tx') }}</td>
                    <td>{{ getBlock.count }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.size') }}</td>
                    <td>{{ getBlock.size }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('explorer.version') }}</td>
                    <td>{{ getBlock.version }}</td>
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
      blockIndex: this.$route.params.index,
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
    // Get latest blocks
    const getBlock = await $axios.$get(process.env.CACHE_API + '/block/' + params.index)

    getBlock.timestamp = moment(getBlock.timestamp).format('DD-MM-YY HH:MM:SS')

    // Get tx related to
    const getTxs = await $axios.$get(process.env.CACHE_API + '/transaction/block/' + params.index)

    if (getTxs.length >= 1) {
      getTxs.forEach((tx) => {
        tx.timestamp = moment(tx.timestamp).format('DD-MM-YY HH:MM:SS')
      })
    }
    return {
      getBlock,
      getTxs
    }
  },
  mounted () {
  }
}
</script>

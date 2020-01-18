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
            {{ $t('nodes.nodes') }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="nodesTableHeader"
              :items="getNodes"
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
      getNodes: [],
      nodesTableHeader: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Address',
          align: 'center',
          value: 'address'
        },
        {
          text: 'Height',
          align: 'center',
          value: 'height'
        },
        {
          text: 'P2P',
          align: 'center',
          value: 'p2p'
        },
        {
          text: 'API',
          align: 'center',
          value: 'api'
        },
        {
          text: 'Uptime',
          align: 'center',
          value: 'uptime'
        },
        {
          text: 'Updated',
          align: 'right',
          value: 'updated'
        }
      ]
    }
  },
  watchQuery: true,
  async asyncData ({ $axios }) {
    // Get nodes
    const getNodes = await $axios.$get(process.env.NETWORK_API + '/nodes/all')

    getNodes.forEach((node) => {
      node.updated = moment(node.updated).format('DD-MM-YY HH:MM:SS')
    })

    return {
      getNodes
    }
  },
  mounted () {
  }
}
</script>

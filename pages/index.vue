<template>
  <div>
    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="title" />
          <v-card-text />
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
          <v-card-title class="title" />
          <v-card-text />
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="title">
            Latest Blocks
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Index
                    </th>
                    <th class="text-center">
                      Txs
                    </th>
                    <th class="text-right">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="block in getBlocks" :key="block.index">
                    <td><a :href="'block/' + block.index">{{ block.index }}</a></td>
                    <td class="text-center">
                      {{ block.count }}
                    </td>
                    <td class="text-right">
                      {{ block.timestamp }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title class="title" />
          <v-card-text />
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
  async asyncData ({ $axios }) {
    const getBlocks = await $axios.$get(process.env.API_URL + '/block/last/10')
    console.log(getBlocks)

    getBlocks.forEach((block) => {
      block.timestamp = moment(block.timestamp).format('DD-MM-YY HH:MM:SS')
    })

    return { getBlocks }
  }
}
</script>

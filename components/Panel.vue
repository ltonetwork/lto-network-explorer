<template>
  <v-container align="center" align-content="center" style="margin-top: -45px;">
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col cols="3">
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
          <v-col cols="3">
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
          <v-col cols="3">
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
          <v-col cols="3">
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
    </v-card>
  </v-container>
</template>
<script>

export default {
  components: {
  },
  data () {
    return {
      panel: {
        nodes: 55,
        staked: 450000,
        price: 0.04,
        market: 5000000
      }
    }
  }
}
</script>

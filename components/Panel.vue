<template>
  <v-container align="center" align-content="center" class="mt-n12">
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col cols="3">
            <p class="caption mt-0 mb-2">
              {{ $t('panel.nodes') }}
            </p>

            <h2
              style="color:#1a004b;"
              class="mb-0"
            >
              {{ nodes }}
            </h2>

            <v-spacer />
            <v-sparkline
              :gradient="['#804BC9', 'rgba(249, 246, 252, .6)']"
              :line-width="4"
              :padding="0"
              :smooth="15"
              :value="[0, 2, 5, 9, 5, 2, 3, 5, 0, 0, 1, 6, 2, 1, 1]"
              fill
              auto-line-width
              auto-draw
            />
          </v-col>
          <v-col cols="3">
            <p class="caption mt-0 mb-2">
              {{ $t('panel.staked') }}
            </p>

            <h2
              style="color:#1a004b;"
              class="mb-0"
            >
              {{ staked }}
            </h2>

            <v-spacer />

            <v-sparkline
              :gradient="['#804BC9', 'rgba(249, 246, 252, .6)']"
              :line-width="4"
              :padding="5"
              :smooth="15"
              :value="[1, 10, 3, 5, 0, 2, 5, 2, 5, 0, 1, 8, 2, 9, 0]"
              fill
              auto-draw
            />
          </v-col>
          <v-col cols="3">
            <p class="caption mt-0 mb-2">
              {{ $t('panel.price') }}
            </p>

            <h2
              style="color:#1a004b;"
              class="mb-0"
            >
              {{ price }}
            </h2>

            <v-spacer />

            <v-sparkline
              :gradient="['#804BC9', 'rgba(249, 246, 252, .6)']"
              :line-width="4"
              :padding="5"
              :smooth="15"
              :value="[0, 0, 1, 0, 2, 5, 2, 3, 5, 8, 2, 9, 0, 5, 9,]"
              fill
              auto-draw
            />
          </v-col>
          <v-col cols="3">
            <p class="caption mt-0 mb-2">
              {{ $t('panel.market') }}
            </p>

            <h2
              style="color:#1a004b;"
              class="mb-0"
            >
              {{ market }}
            </h2>

            <v-spacer />

            <v-sparkline
              :gradient="['#804BC9', 'rgba(249, 246, 252, .6)']"
              :line-width="4"
              :padding="5"
              :smooth="15"
              :value="[2, 3, 5, 0, 0, 1, 8, 2, 9, 0, 0, 2, 5, 9, 5, ]"
              fill
              auto-draw
            />
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
      nodes: 55,
      staked: 450000,
      price: 0.04,
      market: 5000000
    }
  }
}
</script>

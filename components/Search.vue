<template>
  <v-toolbar
    :height="170"
    color="#17054B"
    class="white--text p-0"
    flat
  >
    <v-container>
      <v-row justify="center">
        <v-col
          :cols="12"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <v-text-field
            v-model="query"
            @keydown.enter="executeQuery"
            solo-inverted
            hide-details
            single-line
            flat
            rounded
            label="transaction ID, address or block height"
            prepend-inner-icon="mdi-magnify"
            background-color="rgba(255,255,255, 0.1)"
            color=""
            clearablec
          />
        </v-col>

        <v-col
          :cols="0"
          :sm="0"
          :md="2"
          :lg="2"
        >
          <v-btn
            v-model="calculater"
            class="hidden-sm-and-down"
            color="rgba(255,255,255,0.1)"
            rounded
            outlined
            large
          >
            {{ $t('calculator.title') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
<script>

export default {
  data: () => ({
    query: null,
    valid: false,
    url: null
  }),
  watch: {
    query () {
      this.validateQuery()
    }
  },
  methods: {
    validateQuery () {
      // Reset
      this.valid = false

      // Block
      if (Number.isInteger(+this.query) && this.query.length <= 6) {
        this.valid = true
        this.url = '/block/' + this.query
      // Tx
      } else if (this.query.length === 44) {
        this.valid = true
        this.url = '/transaction/' + this.query
      // Address
      } else if (this.query.length === 35) {
        this.valid = true
        this.url = '/address/' + this.query
      }
    },
    executeQuery () {
      if (this.valid) {
        this.$router.push(this.url)
      }
    }
  }
}
</script>

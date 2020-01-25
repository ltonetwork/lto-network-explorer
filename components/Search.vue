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
          :sm="12"
          :md="10"
          :lg="8"
        >
          <v-text-field
            v-model="query"
            @keydown.enter="executeQuery"
            solo-inverted
            hide-details
            single-line
            flat
            label="Enter either a transaction ID, address or block number."
            prepend-inner-icon="mdi-magnify"
            background-color="#44297d"
            color="#6e5f8e"
            class="text-center white--text"
          />
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
      console.log(this.query)
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
      console.log(this.valid)
      if (this.valid) {
        this.$router.push(this.url)
        console.log(this.url)
      }
    }
  }
}
</script>

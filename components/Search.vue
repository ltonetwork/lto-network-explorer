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
            id="search"
            v-model="query"
            solo-inverted
            hide-details
            single-line
            flat
            rounded
            prepend-inner-icon="mdi-magnify"
            background-color="rgba(255,255,255, 0.1)"
            color="white"
            class="search"
            clearable
            @keydown.enter="executeQuery"
            @focus="focus"
          >
            <template v-slot:default="t">
              <span style="color:rgba(255,255,255, 0.4)">{{ t }}</span>
            </template>

            <template v-slot:prepend-inner>
              <v-icon style="color:rgba(255,255,255, 0.4)">
                mdi-magnify
              </v-icon>
            </template>

            <template v-slot:label>
              <span style="color:rgba(255,255,255, 0.4)">{{ $t('search.label') }}</span>
            </template>
          </v-text-field>
        </v-col>

        <v-col
          :cols="0"
          :sm="0"
          :md="2"
          :lg="2"
        >
          <v-btn
            class="hidden-sm-and-down"
            color="rgba(255,255,255,0.1)"
            rounded
            outlined
            large
            @click="showCalculator"
          >
            {{ $t('calculator.title') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component({
})
class Search extends Vue {
  query: string | null = null;
  valid = false;
  url: string | null = null;

  @Watch('query')
  onQueryChanged (): void {
    this.validateQuery()
  }

  focus (e: number): void {
    console.log(e)
  }

  validateQuery (): void {
    // Reset
    this.valid = false

    if (this.query !== null) {
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
    }
  }

  executeQuery (): void {
    if (this.valid) {
      this.$router.push(this.url!)
    }
  }

  showCalculator (): void {
    alert('not implemented yet')
  }
}

export default Search

/*
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
    focus (e) {
      console.log(e)
    },
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
    },
    showCalculator () {
      alert('not implemented yet')
    }
  }
}
*/
</script>

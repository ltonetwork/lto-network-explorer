<template>
  <div>
    <v-row>
      <v-col
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card class="mt-n12">
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transfer" />
            {{ $t('transaction.title') }}
          </v-card-title>
          <v-card-text class="pa-0">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.id') }}
                    </td>
                    <td>{{ transaction.id }}</td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.type') }}
                    </td>
                    <td>{{ name(transaction.type) }} (Type {{ transaction.type }})</td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.timestamp') }}
                    </td>
                    <td>{{ transaction.timestamp | parseTime }}</td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.block') }}
                    </td>
                    <td>
                      <nuxt-link :to="{ path: '/block/' + transaction.height }">
                        {{ transaction.height | parseString }}
                      </nuxt-link>
                    </td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.sender') }}
                    </td>
                    <td>
                      <nuxt-link :to="{ path: '/address/' + transaction.sender }">
                        {{ transaction.sender }}
                      </nuxt-link>
                    </td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.recipient') }}
                    </td>
                    <td>
                      <nuxt-link v-if="transaction.recipient" :to="{ path: '/address/' + transaction.recipient }">
                        {{ transaction.recipient }}
                      </nuxt-link>

                      <span v-if="transaction.type === 11">[ {{ transaction.transfers.length }} addresses ]</span>
                      <span v-if="transaction.type !== 11 && !transaction.recipient">N/A</span>
                    </td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.amount') }}
                    </td>
                    <td>
                      {{ transaction.amount | parseAtomic | parseNumber }}
                    </td>
                  </tr>
                  <tr />
                  <tr>
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.fee') }}
                    </td>
                    <td>
                      {{ transaction.fee | parseAtomic | parseNumber }}
                    </td>
                  </tr>
                  <tr v-if="transaction.type === 11">
                    <td class="font-weight-bold secondary--text">
                      {{ $t('explorer.signature') }}
                    </td>
                    <td>
                      <div v-for="proof in transaction.proofs" v-bind:key="proof">
                        {{ proof }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="transaction.type === 11 "
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('explorer.transfers') }}
          </v-card-title>
          <v-card-text class="pa-0">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="overline grey--text text-left">
                      Recipient
                    </th>
                    <th class="overline grey--text text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tx, i) in transaction.transfers" :key="i">
                    <td>
                      <nuxt-link :to="{ path: '/address/' + tx.recipient }" class="d-inline-block primary--text">
                        {{ tx.recipient | truncateString }}
                      </nuxt-link>
                    </td>
                    <td class="text-right">
                      {{ tx.amount | parseAtomic | parseNumber }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="valid"
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card class="green dark">
          <v-card-text class="pa-3">
            <v-row>
              <v-col
                :cols="4"
                :sm="2"
                :md="2"
                :lg="2"
              >
                <v-icon style="font-size:5rem;" class="mt-2">
                  mdi-check
                </v-icon>
              </v-col>
              <v-col
                :cols="8"
                :sm="10"
                :md="10"
                :lg="10"
              >
                <div class="headline font-weight-bold">
                  {{ $t('transaction.valid') }}
                </div>
                <div class="title">
                  {{ hash }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="invalid"
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card class="red dark">
          <v-card-text class="pa-3">
            <v-row>
              <v-col
                :cols="4"
                :sm="2"
                :md="2"
                :lg="2"
              >
                <v-icon style="font-size:5rem;" class="mt-2">
                  mdi-close
                </v-icon>
              </v-col>
              <v-col
                :cols="8"
                :sm="10"
                :md="10"
                :lg="10"
              >
                <div class="headline font-weight-bold">
                  {{ $t('transaction.invalid') }}
                </div>
                <div class="title">
                  {{ hash }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-if="transaction.type === 15 "
        :cols="12"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <v-card>
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-anchor" />
            {{ $t('transaction.anchors') }} ( {{ anchors.length }} )
          </v-card-title>
          <v-card-text>
            <div style="width:300px">
              <v-select
                cache-items
                :items="['hex', 'base58','base64']"
                value="hex"
                @change="encodeAnchor"
              />
            </div>
            <div v-for="(anchor, i) in anchors " :key="i" class="secondary--text">
              <v-text-field v-text="anchor" readonly />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import '@nuxtjs/axios'
  import * as _ from 'lodash'
  import { Transaction, Transfer } from '../types'
  import { EncoderServiceImpl } from '../../plugins/encoder'
  import { txTypes } from '~/data/map'

  @Component({

    validate(/* { params } */): boolean {
      // return !isNaN(params.address)
      return true
    },
    async asyncData({ $axios, params }) {
      const transaction: Transaction = await $axios.$get(process.env.LB_API + '/transactions/info/' + params.transaction, {
        timeout: Number(process.env.AXIOS_TIMEOUT)
      })

      if (transaction.type === 9 || transaction.type === 1 || transaction.type === 15) {
        transaction.amount = 0
      } else if (transaction.type === 11) {
        transaction.amount = _.sumBy(transaction.transfers, function(tx: any) {
          return tx.amount
        })
      }

      return {
        transaction
      }
    }
  })

  class Transactions extends Vue {
    hash = (this as any).$nuxt.$route.query.hash
    valid = false
    invalid = false
    anchors: string[] = []

    decodedAnchors: Uint8Array[] = []
    hexAnchors: string[] = []
    base58Anchors: string[] = []
    base64Anchors: string[] = []
    encoder = new EncoderServiceImpl()

    created(): void {
      /* If we have any anchors, set up the decoded anchor, so we don't need to
       * repeatedly decode/encode. It is base58 format on the transaction. */
      if ((this as any).transaction.anchors) {
        this.decodedAnchors = (this as any).transaction.anchors.map((a: string) => this.encoder.base58Decode(a))

        /* Might as well precompute the different forms, rather than requiring
         * an encode on every different selection. */
        this.hexAnchors = this.decodedAnchors.map(a => this.encoder.hexEncode(a))
        this.base58Anchors = this.decodedAnchors.map(a => this.encoder.base58Encode(a))
        this.base64Anchors = this.decodedAnchors.map(a => this.encoder.base64Encode(a))

        /* Default format is hex. */
        this.anchors = this.hexAnchors

        /* If a hash is given in the query string, we verify that the anchor encoded
         * in one of the three forms matches the hash. */
        if (this.hash) {
          const valid = this.hexAnchors.includes(this.hash) ||
            this.base58Anchors.includes(this.hash) ||
            this.base64Anchors.includes(this.hash)

          this.valid = valid
          this.invalid = !valid
        }
      }
    }

    /* Encode the anchor into the specified format */
    encodeAnchor(value: string): void {
      if (value === 'hex') {
        this.anchors = this.hexAnchors
      } else if (value === 'base58') {
        this.anchors = this.base58Anchors
      } else if (value === 'base64') {
        this.anchors = this.base64Anchors
      }
    }

    name(value: number): string {
      return txTypes[value]?.description || 'Unknown'
    }
  }

  export default Transactions
</script>

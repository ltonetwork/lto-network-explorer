<template>
  <v-dialog
    :value="value"
    max-width="720"
    persistent
    @input="$emit('input', $event)"
  >
    <v-card class="pa-6 rounded-xl migration-modal">
      <v-card-text class="text-center py-6">
        <img :src="require('@/assets/moving.svg')" width="80%">
        <h1 class="mb-2 heading">
          LTO Network is shutting down
        </h1>
        <h2 class="mb-6 subheading">
          The story continues on Base network as EQTY
        </h2>
        <div class="mb-6">
          <a
            class="link"
            href="https://blog.ltonetwork.com/a-new-chapter-for-lto-network-transition-to-base-and-a-dao-driven-future/"
            target="_blank"
            rel="noopener"
          >
            Read more about the migration to EQTY
          </a>
        </div>
        <div class="d-flex justify-center">
          <v-btn color="primary" class="px-6" depressed @click="close">Got it</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class MigrationModal extends Vue {
  @Prop({ type: Boolean, default: false }) readonly value!: boolean

  close() {
    this.$emit('input', false)
  }
}
</script>

<style scoped>
.migration-modal {
  background: linear-gradient(180deg, #ffffff, #faf7ff);
}
.moving-img {
  width: 160px;
  height: auto;
  opacity: 0.95;
}
.heading {
  font-size: 28px;
  line-height: 1.2;
  font-weight: 700;
}
.subheading {
  font-size: 18px;
  font-weight: 400;
  color: #5c6b7a;
}
.link {
  color: #6f42c1;
  text-decoration: none;
  font-weight: 600;
}
.link:hover {
  text-decoration: underline;
}
</style>

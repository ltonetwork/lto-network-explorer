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
            dark
            solo-inverted
            hide-details
            flat
            label="Search for a transaction ID, address or block"
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
</script>

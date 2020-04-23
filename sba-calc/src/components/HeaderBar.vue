<template>
    <v-app-bar
      app
      color="white"
      height="70"
      style="padding: 0 100px"
    >
    <v-row>
      <v-col class="align-center">
        <v-img
          alt="H&CO | Global Advisors"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/hco-logo.svg"
          transition="scale-transition"
          width="150"
        />
      </v-col>

      <v-col class="align-self-center justify-self-center">
        <v-btn text style="font-size:1.3rem" class="primary--text">
          PPP Loan Forgiveness Calculator
        </v-btn>
      </v-col>

      <v-col>
      </v-col>

    </v-row>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      > -->
    </v-app-bar>
</template>

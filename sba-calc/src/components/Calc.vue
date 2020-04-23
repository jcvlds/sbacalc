<template>
  <v-container>
    <v-snackbar
      v-model="infoSB"
      timeout="3000"
      top
      color="info"
      style="margin-top:40vh; margin-right:32.5vw;"
    >
      Successful calculation of PPP loan forgiveness
      <v-btn
        color="white"
        text
        @click="snackbar = !snackbar"
      >
        X
      </v-btn>
    </v-snackbar>

    <v-card raised shaped outlined class="d-flex px-10 pt-3">
      <v-row class="text-center" justify="center">

        <v-col cols="12" md="4">
          <v-form ref="form" v-model="valid" id="form">

            <v-text-field
              v-model="loan"
              label="Loan Amount"
              prefix="$"
              @keyup="formatLoan(loan)"
              outlined
              clearable
              :rules="[v => !!v || 'Loan amount is required']"
              >
            </v-text-field>

            <v-text-field
              v-model="payroll"
              label="Payroll Costs"
              prefix="$"
              @keyup="formatPayroll(payroll)"
              outlined
              clearable
              :rules="[v => !!v || 'Payroll costs is required']"
              >
            </v-text-field>

            <v-text-field
              v-model="rent"
              label="Rent"
              @keyup="formatRent(rent)"
              prefix="$"
              outlined
              clearable
              :rules="[v => !!v || 'Loan amount is required']"
              >
            </v-text-field>

            <v-text-field
              v-model="utilities"
              label="Utilities"
              prefix="$"
              @keyup="formatUtilities(utilities)"
              outlined
              clearable
              :rules="[v => !!v || 'Loan amount is required']"
              >
            </v-text-field>

            <v-text-field
              v-model="mortgage"
              label="Mortgage Interest"
              prefix="$"
              @keyup="formatMortgage(mortgage)"
              outlined
              clearable
              :rules="[v => !!v || 'Loan amount is required']"
              >
            </v-text-field>

            <v-text-field
              v-model="fteReduction"
              label="FTE % reduction"
              suffix="%"
              outlined
              clearable
              :rules="[v => !!v || 'Loan amount is required']"
              >
            </v-text-field>

            <v-text-field
              v-model="wageReduction"
              label="Total wage reduction > 25%"
              prefix="$"
              @keyup="formatWage(wageReduction)"
              @keyup.enter="validate(); snackbar = !snackbar"
              outlined
              clearable
              :rules="[v => !!v || 'Loan amount is required']"
              >
            </v-text-field>
          </v-form>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="maxForgivableResult"
              form="form"
              label="Max forgiveable"
              filled
              class="center-input"
              readonly
              >
          </v-text-field>

          <v-text-field
              v-model="totalNonPayrollResult"
              form="form"
              label="Total non-payroll"
              filled
              class="center-input"
              readonly
              >
          </v-text-field>

          <div class="d-flex justify-center" style="margin-top: 24em">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              rounded
              @click="validate; snackbar = !snackbar;"
              > Calculate </v-btn>

              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                right top
                color="success"
                style="margin-top:40vh; margin-right:32.5vw;"
              >
                Successful calculation of PPP loan forgiveness
                <v-btn
                  color="white"
                  text
                  @click="snackbar = !snackbar"
                >
                  X
                </v-btn>
              </v-snackbar>

            <v-btn
              color="error"
              class="mr-4"
              rounded outlined
              @click="reset"
              > Reset Form </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="forgivenResult"
              form="form"
              label="Loan amount forgiven"
              filled
              class="center-input"
              readonly
              >
          </v-text-field>

          <v-text-field
              v-model="repaidResult"
              form="form"
              label="Loan amount to be repaid"
              filled
              class="center-input"
              readonly
              >
          </v-text-field>
        </v-col>

      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Calc',

  data: () => ({
    valid: true,
    snackbar: false,
    infoSB: false,
    timeout: 2500,
    loan: '',
    payroll: '',
    rent: '',
    utilities: '',
    mortgage: '',
    fteReduction: '',
    wageReduction: '',
    totalNonPayroll: '',
    totalNonPayrollResult: '',
    maxForgivable: '',
    maxForgivableResult: '',
    ftePenalty: '',
    wagePenalty: '',
    forgiven: '',
    forgivenResult: '',
    repaid: '',
    repaidResult: ''
  }),
  methods: {
    validate () {
      // this.forgiven = this.$refs.form.validate()
      this.totalNonPayroll = Math.round(parseInt(this.rent.replace(/,/g,'')) + parseInt(this.utilities.replace(/,/g,'')) + parseInt(this.mortgage.replace(/,/g,''))) // eslint-disable-line
      // this.totalNonPayrollResult = `$ ${this.totalNonPayroll}`
      this.totalNonPayrollResult = this.toCurrency(this.totalNonPayroll)

      if ((parseInt(this.payroll.replace(/,/g,'')) / 0.75) > (parseInt(this.payroll.replace(/,/g,'')) + parseInt(this.totalNonPayroll))) { // eslint-disable-line
        this.maxForgivable = Math.round(parseInt(this.payroll.replace(/,/g,'')) + parseInt(this.totalNonPayroll)) // eslint-disable-line
        // this.maxForgivableResult = `$ ${this.maxForgivable}`
        this.maxForgivableResult = this.toCurrency(this.maxForgivable)
      } else {
        this.maxForgivable = Math.round(parseInt(this.payroll.replace(/,/g,'')) / 0.75) // eslint-disable-line
        // this.maxForgivableResult = `$ ${this.maxForgivable}`
        this.maxForgivableResult = this.toCurrency(this.maxForgivable)
      }

      this.ftePenalty = (-1 * parseFloat(this.fteReduction / 100)) * (parseInt(this.payroll.replace(/,/g,'')) + parseInt(this.totalNonPayroll)) // eslint-disable-line
      this.wagePenalty = -1 * parseInt(this.wageReduction.replace(/,/g,'')) // eslint-disable-line

      if ((this.maxForgivable + this.ftePenalty + this.wagePenalty) < this.loan.replace(/,/g,'')) { // eslint-disable-line
        this.forgiven = Math.round(this.maxForgivable + this.ftePenalty + this.wagePenalty)
        // this.forgivenResult = `$ ${this.forgiven}`
        this.forgivenResult = this.toCurrency(this.forgiven)
      } else {
        this.forgiven = this.loan.replace(/,/g,'') // eslint-disable-line
        // this.forgivenResult = `$ ${this.forgiven}`
        this.forgivenResult = this.toCurrency(this.forgiven)
      }
      this.repaid = Math.round(this.loan.replace(/,/g,'') - this.forgiven) // eslint-disable-line
      // this.repaidResult = `$ ${this.repaid}`
      this.repaidResult = this.toCurrency(this.repaid)
    },
    reset () {
      this.$refs.form.reset()
      this.totalNonPayrollResult = ''
      this.maxForgivableResult = ''
      this.forgivenResult = ''
      this.repaidResult = ''
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    toCurrency (amt) {
      var formatter = new Intl.NumberFormat('en-US', {
        // maximumSignificantDigits: 6,
        minimumFractionDigits: 0,
        style: 'currency',
        currency: 'USD'
        // currencyDisplay: 'symbol'
      })

      const curr = formatter.format(amt)
      return curr
    },
    toLocale (amt) {
      var formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0
      })

      const curr = formatter.format(amt)
      return curr
    },
    formatLoan (amt) {
      var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
      // input = input ? parseInt(input, 10) : 0
      this.loan = this.toLocale(input)
    },
    formatPayroll (amt) {
      var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
      if (input !== '') {
        this.payroll = this.toLocale(input)
      }
    },
    formatRent (amt) {
      var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
      if (input !== '') {
        this.rent = this.toLocale(input)
      }
    },
    formatUtilities (amt) {
      var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
      if (input !== '') {
        this.utilities = this.toLocale(input)
      }
    },
    formatMortgage (amt) {
      var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
      if (input !== '') {
        this.mortgage = this.toLocale(input)
      }
    },
    formatFTE (amt) {
      var input = amt.replace(/[\D\s\-]+/g, '') // eslint-disable-line
      this.fteReduction = this.toLocale(input)
    },
    formatWage (amt) {
      var input = amt.replace(/[\D\s\._\-]+/g, '') // eslint-disable-line
      if (input !== '') {
        this.wageReduction = this.toLocale(input)
      }
    }
  }
}
</script>

<style scoped>
.center-input >>> input {
  text-align: center
}
</style>

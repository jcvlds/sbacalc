<template>
<!-- @mouseenter="check()" -->
  <v-container>
    <v-snackbar
      v-model="infoSnackbar"
      :timeout="infoTO"
      @mouseenter="check()"
      top
      color="info"
      class="text-center"
      style="margin-top:8vh; font-size:18px;"
    >
      Welcome.<br>Please use the amounts spent from PPP loan proceeds during the eight-week period that begins on the date the lender makes the first disbursement of the PPP loan to the borrower.
      <v-btn
        color="white"
        text
        @click="infoSnackbar = !infoSnackbar; check()"
      >
        X
      </v-btn>
    </v-snackbar>
    <div v-if="company" class="mb-5 d-flex display-1
      font-weight-black text-uppercase
      justify-center mt-n7 mb-2">
      <div>{{ titleCase(company) }}</div>
    </div>
    <div v-if="company" class="accent--text d-flex subtitle
      font-weight-medium font-italic text-uppercase
      justify-center mt-n7 mb-2">
      <div class="mt-1 accent--text">Portal <v-icon class="accent--text">mdi-folder-multiple-outline</v-icon> </div>
    </div>

    <v-card raised shaped outlined class="d-flex px-10 pt-3" id="top" ref="top">
      <v-row class="text-center" justify="center">

        <v-col cols="12" md="4">
          <v-form ref="form" v-model="valid" id="form">

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="loan"
                  label="Loan Amount"
                  prefix="$"
                  v-on="on"
                  @keyup="formatLoan(loan)"
                  outlined
                  clearable
                  :rules="[v => !!v || 'Loan amount is required']"
                  >
                </v-text-field>
              </template>
              <span>Enter the actual total PPP loan amount obtained</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="payroll"
                  label="Payroll Costs"
                  prefix="$"
                  v-on="on"
                  @keyup="formatPayroll(payroll)"
                  outlined
                  clearable
                  :rules="[v => !!v || 'Payroll costs is required']"
                  >
                </v-text-field>
              </template>
              <span>Include salary, wages, commissions, or tips (capped at $100,000 on an annualized basis for each employee);  Employee benefits including costs for vacation, parental, family, medical, or sick leave; allowance for separation or dismissal; payments required for the provisions of group health care benefits including insurance premiums; and payment of any retirement benefit; State and local taxes assessed on compensation;  For a sole proprietor or independent contractor: wages, commissions, income, or net earnings from self-employment, capped at $100,000 on an annualized basis for each employee.</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="rent"
                  label="Rent"
                  v-on="on"
                  @keyup="formatRent(rent)"
                  prefix="$"
                  outlined
                  clearable
                  :rules="[v => !!v || 'Loan amount is required']"
                  >
                </v-text-field>
              </template>
              <span>Rent under lease agreements in force before February 15, 2020</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="utilities"
                  label="Utilities"
                  prefix="$"
                  v-on="on"
                  @keyup="formatUtilities(utilities)"
                  outlined
                  clearable
                  :rules="[v => !!v || 'Loan amount is required']"
                  >
                </v-text-field>
              </template>
              <span>Utilities for which services began before February 15, 2020</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="mortgage"
                  label="Mortgage Interest"
                  prefix="$"
                  v-on="on"
                  @keyup="formatMortgage(mortgage)"
                  outlined
                  clearable
                  :rules="[v => !!v || 'Loan amount is required']"
                  >
                </v-text-field>
              </template>
              <span>Interest on mortgage obligations incurred before February 15,2020</span>
            </v-tooltip>

            <!-- <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fteReduction"
                  label="FTE % reduction"
                  v-on="on"
                  suffix="%"
                  outlined
                  clearable
                  :rules="[v => !!v || 'Loan amount is required']"
                  >
                </v-text-field>
              </template>
              <span>**A reduction in FTEs or wages between 2/15/20 and 4/27/20 is disregarded if the reduction is eliminated by 6/30/20**</span>
            </v-tooltip> -->
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fteReductionDisplay"
                  label="FTE % reduction"
                  v-on="on"
                  @focus="fteDialog()"
                  suffix="%"
                  outlined
                  readonly
                  clearable
                  :rules="[v => !!v || 'Loan amount is required']"
                  >
                </v-text-field>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">FTE Counts - Calculation Inputs</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="fte2019"
                          label="Monthly Avg FTE's for the period Feb 15 to Jun 30, 2019*"
                          required clearable></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="fte2020"
                          label="Monthly Avg FTE's for the period Jan 1 to Feb 29, 2020*"
                          required clearable></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="fteCoveredWeeks"
                          label="Monthly FTEs during covered period (8 weeks subsequent of receiving the loan)*"
                          required clearable
                          @keyup.enter="saveDialog();dialog = false"></v-text-field>
                      </v-col>
                      </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="saveDialog();dialog = false;">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="wageReduction"
                  label="Total wage reduction > 25%"
                  prefix="$"
                  ref="wageFocus"
                  v-on="on"
                  @keyup="formatWage(wageReduction)"
                  @keyup.enter="validate();"
                  outlined
                  clearable
                  :rules="[v => !!v || 'Loan amount is required']"
                  >
                </v-text-field>
              </template>
              <span>Add up all of the >25% wage reduction dollar amounts for all applicable employees still employed during the eight-week period</span>
            </v-tooltip>

          </v-form>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="maxForgivableResult"
              form="form"
              label="Max forgiveable (before reductions)"
              filled
              class="center-input"
              readonly
              >
          </v-text-field>

          <v-text-field
              v-model="totalNonPayrollResult"
              form="form"
              label="Total spent on non-payroll"
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
              @click="validate();"
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
              label="Loan amount forgiven (after reductions)"
              filled
              class="center-input green-text"
              readonly
              >
          </v-text-field>

          <v-text-field
              v-model="repaidResult"
              form="form"
              label="Loan amt. not forgiven (converted to loan)"
              filled
              class="center-input red-text"
              readonly
              >
          </v-text-field>

          <v-text-field
              v-model="repaidNowResult"
              form="form"
              label="Remaining loan portion to be repaid immediately"
              filled
              class="center-input red-text"
              readonly
              >
          </v-text-field>

          <h3 style="margin-top:15em">Additional Resources:</h3><a href="https://home.treasury.gov/system/files/136/Paycheck-Protection-Program-Frequently-Asked-Questions.pdf">Treasury - Frequently Asked Questions</a>
          <br> <a href="https://home.treasury.gov/policy-issues/cares/assistance-for-small-businesses">Treasury - Current Rules & Information</a>
        </v-col>

      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Calc',

  data: () => ({
    // isUserLoggedIn: false,
    valid: true,
    snackbar: false,
    infoSnackbar: true,
    timeout: 2500,
    infoTO: 60000,
    dialog: false,
    loan: '',
    payroll: '',
    rent: '',
    utilities: '',
    mortgage: '',
    fte2019: '',
    fte2020: '',
    fteCoveredWeeks: '',
    fteReduction: '',
    fteReductionDisplay: '',
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
    repaidResult: '',
    repaidNow: '',
    repaidNowResult: ''
  }),
  computed: {
    ...mapState([
      'isUserLoggedIn', 'user', 'company', 'loanAmt'
    ])
  },
  mounted () {
    this.check()
  },
  methods: {
    titleCase (str) {
      var splitStr = str.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },
    check () {
      // console.log(this.isUserLoggedIn)
      if (!this.isUserLoggedIn) {
        this.$router.push({
          name: 'Login'
        })
      }
      if (this.loanAmt) {
        // this.formatLoan(toString(this.loanAmt))
        this.loan = this.toLocale(this.loanAmt)
      }
    },
    validate () {
      const coord = this.$refs.top.offsetTop
      this.$scrollTo(0, coord)

      // this.forgiven = this.$refs.form.validate()
      this.totalNonPayroll = Math.round(parseInt(this.rent.replace(/,/g,'')) + parseInt(this.utilities.replace(/,/g,'')) + parseInt(this.mortgage.replace(/,/g,''))) // eslint-disable-line
      // this.totalNonPayrollResult = `$ ${this.totalNonPayroll}`
      this.totalNonPayrollResult = this.toCurrency(this.totalNonPayroll)

      if ((parseInt(this.payroll.replace(/,/g,'')) / 0.75) >= (parseInt(this.payroll.replace(/,/g,'')) + parseInt(this.totalNonPayroll))) { // eslint-disable-line
        this.maxForgivable = Math.round(parseInt(this.payroll.replace(/,/g,'')) + parseInt(this.totalNonPayroll)) // eslint-disable-line
        // this.maxForgivableResult = `$ ${this.maxForgivable}`
        this.maxForgivableResult = this.toCurrency(this.maxForgivable)
      } else {
        this.maxForgivable = Math.round(parseInt(this.payroll.replace(/,/g,'')) / 0.75) // eslint-disable-line
        // this.maxForgivableResult = `$ ${this.maxForgivable}`
        this.maxForgivableResult = this.toCurrency(this.maxForgivable)
      }

      this.ftePenalty = -1 * (parseFloat(this.fteReduction / 100)) * (parseInt(this.payroll.replace(/,/g,'')) + parseInt(this.totalNonPayroll)) // eslint-disable-line
      console.log(this.ftePenalty)
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
      // this.repaid = Math.round(this.loan.replace(/,/g,'') - this.forgiven) // eslint-disable-line
      this.repaid = Math.round(-1 * (this.wagePenalty + this.ftePenalty)) // eslint-disable-line
      // this.repaidResult = `$ ${this.repaid}`
      this.repaidResult = this.toCurrency(this.repaid)

      this.repaidNow = Math.round(this.loan.replace(/,/g,'') - this.forgiven - this.repaid) // eslint-disable-line
      this.repaidNowResult = this.toCurrency(this.repaidNow)

      this.snackbar = !this.snackbar
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
    fteDialog () {
      this.fteReductionDisplay = 0
      this.dialog = true
    },
    saveDialog () {
      if (parseFloat(this.fte2019) < parseFloat(this.fte2020)) {
        this.fteReduction = ((parseFloat(this.fteCoveredWeeks) / parseFloat(this.fte2019)) - 1) * -100
        this.fteReductionDisplay = (((parseFloat(this.fteCoveredWeeks) / parseFloat(this.fte2019)) - 1) * -100).toFixed(2)
        this.$nextTick(this.$refs.wageFocus.focus)
      } else {
        this.fteReduction = ((parseFloat(this.fteCoveredWeeks) / parseFloat(this.fte2020)) - 1) * -100
        this.fteReductionDisplay = (((parseFloat(this.fteCoveredWeeks) / parseFloat(this.fte2020)) - 1) * -100).toFixed(2)
        this.$nextTick(this.$refs.wageFocus.focus)
      }
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
      if (input !== '') {
        this.loan = this.toLocale(input)
      }
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
.green-text >>> input {
  color: green !important
}
.red-text >>> input {
  color: red !important
}
</style>

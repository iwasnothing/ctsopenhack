import React from "react";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Paper from "material-ui/Paper";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import MenuBar from "./MenuBar";
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';

class Loan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      loading: false,
      tileData: [],
      kivaData: [],
      auth: true,
      anchorEl: null,
      open: false,
      activeStep: 0,
      borrow: 5,
      from_bank: 0,
      from_kiva: 0,
      duration: 10,
      limit: 25,
      apr: 7,
      monthly: 8000,
      max_loan: null
    };
  }
  handleChange1 = (event,value) => {
    this.setState({ borrow: value });
    //console.log("slide",value)
  };
  handleChange2 = (event,value) => {
    this.setState({ duration: value });
    //console.log("slide",value)
  };
  componentDidMount = () => {
    var urlstr='https://api.hsbc.qa.xlabs.one/productfinder/open-banking/v2.1/unsecured-sme-loans'
    //urlstr='https://api.hsbc.qa.xlabs.one/productfinder/open-banking/v2.1/personal-current-accounts'
    axios.get(urlstr)
    .then(response => {
      this.setState({tileData: response.data.data, loading: false})
      console.log("data",response.data)
    }
    )

    var kurl='https://api.kivaws.org/v1/lending_actions/recent.json'
    //urlstr='https://api.hsbc.qa.xlabs.one/productfinder/open-banking/v2.1/personal-current-accounts'
    axios.get(kurl)
    .then(response => {
      this.setState({kivaData: response.data.lending_actions, loading: false})
      console.log("data",response.data)
    }
    )

  };
  handleVerify = () => {
    var from_bank = this.state.borrow>this.state.limit ? this.state.limit*1000:this.state.borrow*1000
    var from_kiva = this.state.borrow>this.state.limit ? Math.round(this.state.borrow-this.state.limit)*1000:0
    this.setState({activeStep: 1, from_bank: from_bank, from_kiva: from_kiva})
  };
  handleKiva = () => {
    this.setState({loading: true})
    var r = this.state.tileData[0].Brand[0].SMELoan[0].SMELoanMarketingState[0].LoanInterest.LoanInterestTierBandSet[0].LoanInterestTierBand[0].RepAPR
    var p = this.state.borrow*1000
    var t = Math.ceil(this.state.duration*3)
    var from_kiva = this.state.from_kiva
    var urlstr='https://us-central1-ctsopenhack.cloudfunctions.net/calculate/'
    console.log("tiledata",this.state.kivaData)
    var kiva_loan = this.state.kivaData.filter(loan => loan.loan.loan_amount > from_kiva).sort(function (a, b) {
        return (a.loan.funded_amount / a.loan.loan_amount) - (b.loan.funded_amount / b.loan.loan_amount) })
    var maxloan = kiva_loan[kiva_loan.length - 1]

    //urlstr='https://api.hsbc.qa.xlabs.one/productfinder/open-banking/v2.1/personal-current-accounts'
    axios.post(urlstr,{"amount": p, "interest": r, "month": t})
    .then(response => {
      this.setState({
        activeStep: 2,
        apr: r,
        monthly: response.data.payment,
        max_loan: maxloan
      });
      console.log("calc",response.data)
    }
    )

  };
  reset = () => {
    this.setState({activeStep: 0, loading: false})
  };

  render() {
    return (

        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            <MenuBar />
            <Paper style={{ width: 450 }}>
            <Stepper
              activeStep={this.state.activeStep}
              orientation="vertical"
            >
              <Step key="step1">
                <StepLabel>Input Loan Details</StepLabel>
                <StepContent>
                <Typography id="label">Borrow Amount: ${this.state.borrow*1000}</Typography>
                <br/>
                <Slider
                  style={{width: 250}}
                  value={this.state.borrow}
                  aria-labelledby="label"
                  onChange={this.handleChange1}
                />
                <br/>
                <Typography id="label">Repayment months: {Math.ceil(this.state.duration*3)}</Typography>
                <br/>
                <Slider
                  style={{width: 250}}
                  value={this.state.duration}
                  aria-labelledby="label"
                  onChange={this.handleChange2}
                />
                <br/>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleVerify}
                  >
                    Submit
                  </Button>
                </StepContent>
              </Step>
              <Step key="step2">
                <StepLabel>Prelimiary Loan Suggestion</StepLabel>
                <StepContent>

                <Typography id="label">( p.s. subject to your credit condition )</Typography>
                <br/>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Borrow from</TableCell>
                      <TableCell>Estimated Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <TableRow>
                     <TableCell>Commerical Bank</TableCell>
                     <TableCell>${this.state.from_bank}</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>Kiva</TableCell>
                     <TableCell>${this.state.from_kiva}</TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>

                <br/>
                {this.state.loading ?  <div style={{marginLeft: 80}}>
                                  <CircularProgress id='progressbar' color="secondary" size={40} />
                                </div> : <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleKiva}
                  >
                    Loan Projection
                  </Button> </div>}
                </StepContent>
              </Step>
              <Step key="step3">
                <StepLabel>Replayment Plan</StepLabel>
                <StepContent>

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Commerical Loan details</TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                    <TableCell>Loan Amount</TableCell>
                    <TableCell>${this.state.from_bank}</TableCell>
                     </TableRow>
                    <TableRow>
                    <TableCell>Annual Interest</TableCell>
                    <TableCell>{this.state.apr}%</TableCell>
                 </TableRow>
                 <TableRow>
                 <TableCell>Monthly Payment</TableCell>
                 <TableCell>${this.state.monthly}</TableCell>
              </TableRow>

              </TableBody>
                 </Table><br/>
                 <Table>
                   <TableHead>
                     <TableRow>
              <TableCell>Example Kiva loan</TableCell>
              <TableCell>
<a href='https://api.kivaws.org/v1/loans/1622763/repayments'>Replayment Plan</a>
              </TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              <TableRow>
              <TableCell>Loan borrower</TableCell>
              <TableCell>{ this.state.max_loan === null ? this.state.max_loan :
              this.state.max_loan.loan.name}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Loan amount</TableCell>
              <TableCell>{ this.state.max_loan === null ? this.state.max_loan :
              this.state.max_loan.loan.loan_amount}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Funed %</TableCell>
              <TableCell>{ this.state.max_loan === null? this.state.max_loan :
this.state.max_loan.loan.funded_amount/this.state.max_loan.loan.loan_amount*100}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Loan Usage</TableCell>
              <TableCell>  { this.state.max_loan === null? this.state.max_loan :
                this.state.max_loan.loan.use}</TableCell>
              </TableRow> </TableBody>
                 </Table>
                  <br/><a href="https://www.business.hsbc.uk/en-gb/finance-and-borrowing/credit-and-lending/small-business-loan">Apply HSBC loan</a>
                  <br/><a href="https://pages.kiva.org/borrow/start">Apply Kiva loan</a>
                  <br/><br/>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.reset}
                  >
                    Start Over
                  </Button>
                </StepContent>
              </Step>
            </Stepper>
            </Paper>
          </div>
        </MuiThemeProvider>

    );
  }
}
const LoanWithRouter = withRouter(Loan);
export default LoanWithRouter;

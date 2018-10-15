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
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuBar from "./MenuBar";
import axios from "axios"

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showlist: true,
      loading: true,
      tileData: [],
      selectedRow: {},
      filterData: [],
      keyword: "",
      useFilter: true,
      testtileData: [
        {
          title: "EEP Company",

        },
        {
          title: "Britain Wireless",

        }
      ],
      auth: true,
      anchorEl: null,
      open: false
    };
  }
  componentDidMount() {
    var urlstr='https://api.hsbc.qa.xlabs.one/productfinder/open-banking/v2.1/unsecured-sme-loans'
    //urlstr='https://api.hsbc.qa.xlabs.one/productfinder/open-banking/v2.1/personal-current-accounts'
    axios.get(urlstr)
    .then(response => {
      this.setState({tileData: response.data.data, loading: false})
      console.log("data",response.data)
    }
    )
  }

  render() {
    const loanlist =  <List
                            component="nav"
                            subheader={
                              <ListSubheader component="div">Loan Choices</ListSubheader>
                            }>
                    {this.state.tileData.map((loan,index)=>(
                      <ListItem
                        onClick={
                          () => {
                            this.setState({showlist: false, selectedRow: loan});
                            console.log("index",index);
                            console.log("load",loan);
                          }
                       }
                      >
                        <ListItemText
                        primary={loan.Brand[0].BrandName}
                        //secondary={loan.Brand[0].SMELoan[0].}
                        />
                      </ListItem>
                    ))}
                  </List>
    const loandetail =  <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Heading</TableCell>
                            <TableCell>Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                           <TableCell>Product</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.Brand[0].BrandName}</TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell>Segment</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.Brand[0].SMELoan[0].Segment}</TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell>Interest Rate</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.Brand[0].SMELoan[0].SMELoanMarketingState[0].LoanInterest.LoanInterestTierBandSet[0].LoanInterestTierBand[0].RepAPR}</TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell>Tier</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.Brand[0].SMELoan[0].SMELoanMarketingState[0].LoanInterest.LoanInterestTierBandSet[0].LoanInterestTierBand[0].Identification}</TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell>Product Description</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.Brand[0].SMELoan[0].SMELoanMarketingState[0].CoreProduct.ProductDescription}</TableCell>
                        </TableRow>

                              <TableRow>
                                 <TableCell><a href={this.state.showlist ? this.state.selectedRow : this.state.selectedRow.Brand[0].SMELoan[0].SMELoanMarketingState[0].CoreProduct.ProductURL}>Product URL</a></TableCell>
                                 <TableCell><a href={this.state.showlist ? this.state.selectedRow : this.state.selectedRow.Brand[0].SMELoan[0].SMELoanMarketingState[0].CoreProduct.ProductURL}>Apply</a></TableCell>
                              </TableRow>

                        </TableBody>
                        </Table>
    return (
      <dashboard>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            <MenuBar />
            <Paper style={{ width: 450 }}>

              {this.state.showlist ? loanlist : loandetail}
              {this.state.loading ?  <div style={{marginLeft: 80}}>
                                <CircularProgress id='progressbar' color="secondary" size={40} />
                              </div> : <div></div>}

            </Paper>
          </div>
        </MuiThemeProvider>
      </dashboard>
    );
  }
}
const DashboardWithRouter = withRouter(Dashboard);
export default DashboardWithRouter;

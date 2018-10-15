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

class Kiva extends React.Component {
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
    var urlstr='https://api.kivaws.org/v1/lending_actions/recent.json'
    //urlstr='https://api.hsbc.qa.xlabs.one/productfinder/open-banking/v2.1/personal-current-accounts'
    axios.get(urlstr)
    .then(response => {
      this.setState({tileData: response.data.lending_actions, loading: false})
      console.log("data",response.data)
    }
    )
  }

  render() {
    const loanlist =  <List
                            component="nav"
                            subheader={
                              <ListSubheader component="div">Recent funded Loans in Kiva</ListSubheader>
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
                        primary={"$"+loan.loan.funded_amount}
                        secondary={loan.loan.sector}
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
                           <TableCell>Name</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.loan.name}</TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell>Usage</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.loan.use}</TableCell>
                        </TableRow>


                        <TableRow>
                           <TableCell>Funded Amount</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.loan.funded_amount}</TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell>Loan Amount</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.loan.loan_amount}</TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>Lender Count</TableCell>
                           <TableCell>{ this.state.showlist ? this.state.selectedRow :
this.state.selectedRow.loan.lender_count}</TableCell>
                        </TableRow>

                        </TableBody>
                        </Table>
    return (
      <kiva>
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
      </kiva>
    );
  }
}
const KivaWithRouter = withRouter(Kiva);
export default KivaWithRouter;

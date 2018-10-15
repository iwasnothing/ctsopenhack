import React from "react";
import { Link } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Menu from "material-ui/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import AppBar from "material-ui/AppBar";
import Popover from "material-ui/Popover";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list: []
    };
  }
  componentDidMount() {}

  getList(username) {
    var self = this;
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();
    //console.log(event.currentTarget);
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    return (

        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            <AppBar
              title="CTS"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonClick={this.handleClick}
              style={{ width: 450 }}
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
              onRequestClose={this.handleRequestClose}
            >
              <Menu onItemClick={this.handleToggle}>
                <MenuItem
                  onClick={this.handleToggle}
                  component={Link}
                  primaryText="Commerical Loan"
                  to="/dashboard"
                >
                  Commerical Loan
                </MenuItem>


                <MenuItem
                  onClick={this.handleToggle}
                  component={Link}
                  primaryText="Kiva Loan"
                  to="/kiva"
                >
                  Kiva Loan
                </MenuItem>

                <MenuItem
                  onClick={this.handleToggle}
                  component={Link}
                  primaryText="Borrow Money"
                  to="/loan"
                >
                  Borrow Money
                </MenuItem>
              </Menu>
            </Popover>
          </div>
        </MuiThemeProvider>

    );
  }
}
export default MenuBar;

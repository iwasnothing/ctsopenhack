import React from "react";
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

class thisPrivateRoute extends React.Component {
  state = {
    loaded: true,
    isAuthenticated: true
  };
  componentDidMount() {}
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          );
        }}
      />
    );
  }
}

const PrivateRoute = withRouter(thisPrivateRoute);
export default PrivateRoute;

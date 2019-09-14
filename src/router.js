import React,{Component} from 'react';
import App from './App'
import Login from './components/Login'
import Home from './components/Home'
import { Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import AuthRouter from './components/AuthRouter';
class Routers extends Component{
    render(){
        return (
        <Router>
          <App>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/login" component={Login}></Route>
              {/*登录权限控制组件*/}
              <AuthRouter path='/main' component={Home}></AuthRouter>
            </Switch>
          </App>
        </Router>
      )
    }
}
export default Routers;
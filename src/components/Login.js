import React, { Component } from 'react'
import axios from 'axios'
import { Grid,Button,TextField} from '@material-ui/core'
import './Login.css'
class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      visitorName:'',
      ssn:'',
    }
  }
  register=(e)=>{
    let data={cu_name:this.state.visitorName,cu_ssn:this.state.ssn}
    axios.post('http://localhost:3001/APIList/userAPI/addUser',data)
    .then(res=>{
      if(res.data.code===0){
        alert('Register Successfully')
      }else{
        alert('Fail to Register')
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  login = (e) =>{
    let data={cu_name:this.state.visitorName,cu_ssn:this.state.ssn}
    axios.post('http://localhost:3001/APIList/userAPI/login',data)
    .then(res=>{
      if(res.data.code===3){
        alert('You have already login for 3 times and can not login today')
      }else if(res.data.code===2){
        alert('You have not register,please register')
      }else{
        let result=res.data.data
        sessionStorage.setItem("isLogin","1");
        sessionStorage.setItem("uGuid",result.uGuid);
        this.props.history.push('./main');
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  render() {
    sessionStorage.setItem("isLogin","0");
    return (
      <Grid container className="Login-Frame" spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="visitorName"
            label="Visitor Name"
            variant="outlined"
            value={this.state.visitorName}
            onChange={e=>this.setState({visitorName:e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ssn"
            label="Security Social Number"
            variant="outlined"
            value={this.state.ssn}
            onChange={e=>this.setState({ssn:e.target.value})}
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={this.register.bind(this)}>Register</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={this.login.bind(this)}>Login</Button>
        </Grid>
      </Grid>
    )
  }
}

export default Login;
import React,{Component} from 'react'
import { Grid,Button,Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core'
import axios from 'axios'
import './Home.css'
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            logHistoryData:[]
        }
    }
    logout = (e) =>{
      let data={uGuid:sessionStorage.getItem('uGuid')}
      axios.post('http://localhost:3001/APIList/userAPI/logout',data)
      .then(res=>{
        sessionStorage.setItem("isLogin","0");
        this.props.history.push('./login');
      })
      .catch(err=>{
        console.log(err)
      })
    }
    componentDidMount(){
        axios.get('http://localhost:3001/APIList/loginHistoryAPI/getLogHistory')
        .then(res=>{
            this.setState({logHistoryData:res.data.data})
        })
        .catch(err=>{
          console.log(err)
        })
    }
    render(){
      return(
        <Grid container className="Home-Page" spacing={2}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={this.logout.bind(this)}>Logout</Button>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Visitor Name</TableCell>
                  <TableCell align="right">Social Security Number</TableCell>
                  <TableCell align="right">Log Date</TableCell>
                  <TableCell align="right">Login Time</TableCell>
                  <TableCell align="right">Logout Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.logHistoryData.map((row,index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.ssn}</TableCell>
                    <TableCell align="right">{row.log_date}</TableCell>
                    <TableCell align="right">{row.login_time}</TableCell>
                    <TableCell align="right">{row.logout_time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )
    }
}
export default Home;
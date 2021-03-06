import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

class Equips extends React.Component {
     
  constructor(props){
    super(props);

    this.state={
      equips:[], 
      teams:[],
      teamanme:"", 
      firstorder:"",
      firstsale:"",
      lastorder:"",
      lastsale:"",
      num:"",
      ename:"",
      sort:"",
      version:"",
      serial:"",
      buyyear:"",
      buycost:"",
      supervise:"",
      register:"",
      user:"",
      updateEdit :[],
      onEdit : this.onEdit,
      onDelete : this.onDelete,
      updateValue : this.updateValue,
      onSave : this.onSave,
      goAlert : this.goAlert,
    };

  }

  getRecord = (num) => {
    const product = this.state.equips.find(item => item.num === num);
    return product;
  }

  onEdit = (num) =>{
    const tempProduct = this.state.equips;
    const index  = tempProduct.indexOf(this.getRecord(num));
    const selectedRecord = tempProduct[index];
    this.setState({
      num : selectedRecord['num'],
      ename : selectedRecord['ename'],
      sort : selectedRecord['sort'],
      version : selectedRecord['version'],
      serial : selectedRecord['serial'],
      buyyear : selectedRecord['buyyear'],
      buycost : selectedRecord['buycost'],
      supervise : selectedRecord['supervise'],
      register : selectedRecord['register'],
      user : selectedRecord['user'],
    })
  }

  updateValue = (e,test) =>{
    if(test === "ename"){
      this.state.ename = e.target.value;
    }
    if(test === "sort"){
      this.state.sort = e.target.value;
    }
    if(test === "version"){
      this.state.version = e.target.value;
    }
    if(test === "serial"){
      this.state.serial = e.target.value;
    }
    if(test === "buyyear"){
      this.state.buyyear = e.target.value;
    }
    if(test === "buycost"){
      this.state.buycost = e.target.value;
    }
    if(test === "supervise"){
      this.state.supervise = e.target.value;
    }
    if(test === "register"){
      this.state.register = e.target.value;
    }
    if(test === "user"){
      this.state.user = e.target.value;
    }
    const tempArr = [this.state.ename, this.state.sort, this.state.version, this.state.serial,
    this.state.buyyear, this.state.buycost, this.state.supervise, this.state.register, this.state.user];
    this.setState({
      updateEdit : tempArr
    })
  }

  onSave = (num) =>{
    if (this.state.updateEdit[0] === "" || this.state.updateEdit[6] === "" || this.state.updateEdit[7] === ""){
      alert("????????? ??????????????????");
      return;
    }
    if(num!==''){ // Update ?????????
      const SaveRecord = this.state.equips;
      const index = SaveRecord.indexOf(this.getRecord(num));
      const Record = SaveRecord[index];
      Record['ename'] = this.state.updateEdit[0];
      Record['sort'] = this.state.updateEdit[1];
      Record['version'] = this.state.updateEdit[2];
      Record['serial'] = this.state.updateEdit[3];
      Record['buyyear'] = this.state.updateEdit[4];
      Record['buycost'] = this.state.updateEdit[5];
      Record['supervise'] = this.state.updateEdit[6];
      Record['register'] = this.state.updateEdit[7];
      Record['user'] = this.state.updateEdit[8];
      this.setState({
        equips : [...this.state.equips],
        num :"" , ename:"", sort:"", version:"", serial:"", buyyear: "", buycost:"", supervise: "",
        register :"", user: ""
      })

      axios.post(`http://${process.env.REACT_APP_API_URL}/equips/update`, //DB??????
      {num: this.state.num, ename: this.state.ename, sort: this.state.sort, version: this.state.version
      , serial:this.state.serial, buyyear: this.state.buyyear, buycost: this.state.buycost,
      supervise: this.state.supervise, register: this.state.register, user: this.state.user})
      .then((response)=>{})
      .catch(err => {
        if (cookies.get("token")) {
          cookies.remove("token");
        }
        alert("????????? ?????????????????????. ?????? ????????? ????????????");
        window.location.href = "/";
      });
      window.location.reload();
    }
    // Insert ?????????
    else{ 
      const MaxNum = Math.max(...this.state.equips.map(item=>item.num))
      const newArr = [];
      newArr['ename'] = this.state.updateEdit[0];
      newArr['sort'] = this.state.updateEdit[1];
      newArr['version'] = this.state.updateEdit[2];
      newArr['serial'] = this.state.updateEdit[3];
      newArr['buyyear'] = this.state.updateEdit[4];
      newArr['buycost'] = this.state.updateEdit[5];
      newArr['supervise'] = this.state.updateEdit[6];
      newArr['register'] = this.state.updateEdit[7];
      newArr['user'] = this.state.updateEdit[8];

      this.setState({
        equips : [...this.state.equips, newArr],
        num :"" , ename:"", sort:"", version:"", serial:"", buyyear: "", buycost:"", supervise: "",
        register :"", user: "", 
      })

      axios.post(`http://${process.env.REACT_APP_API_URL}/equips/add`, //DB??????
      {num: MaxNum+1, ename: this.state.ename, sort: this.state.sort, version: this.state.version, 
      serial:this.state.serial, buyyear: this.state.buyyear, buycost: this.state.buycost,
      supervise: this.state.supervise, register: this.state.register, user: this.state.user})
      .then((response)=>{})
      .catch(err => {
        if (cookies.get("token")) {
          cookies.remove("token");
        }
        alert("????????? ?????????????????????. ?????? ????????? ????????????");
        window.location.href = "/";
      });
      window.location.reload(); 
    }
  }

  //DELETE ?????? 
  onDelete = (num) => {
    if (window.confirm("?????? ??????????????????????????") === true){    //??????
      const tempProduct = this.state.equips.filter(item=> item.num !== num);
    this.setState({
      equips : tempProduct,
      num :"" , ename:"", sort:"", version:"", serial:"", buyyear: "", buycost:"", supervise: "",
      register :"", user: "",
    })
    axios.post(`http://${process.env.REACT_APP_API_URL}/equips/delete`, //DB??????
      {num: num})
      .then((response)=>{})
      .catch(err => {
        if (cookies.get("token")) {
          cookies.remove("token");
        }
        alert("????????? ?????????????????????. ?????? ????????? ????????????");
        window.location.href = "/";
      });
      window.location.reload();
    }else{   //??????
      return;
    }
  }

  componentDidMount(){
  axios.defaults.headers.common['Authorization'] = cookies.get("token");
  this.findAllEquips();
  }

  findAllEquips(){
      axios
      .all([axios.get(`http://${process.env.REACT_APP_API_URL}/equips`),axios.get(`http://${process.env.REACT_APP_API_URL}/teams`) ])
      .then(axios.spread((res1,res2)=>{
             this.setState({equips:res1.data});
             this.setState({teams:res2.data});
          })
      )
      .catch(err => {
        if (cookies.get("token")) {
          cookies.remove("token");
        }
        alert("????????? ?????????????????????. ?????? ????????? ????????????");
        window.location.href = "/";
      });
  }

  render(){
      return(
      <Row>
        <Col>
          <Widget
            title={<p style={{ fontSize:30, fontWeight: 700 }}>????????????</p>}
          >
            <Table size="sm">
              <thead>
                <tr>
                  <th>?????????<br /><br /><Input type="text" value={this.state.ename} onChange={(e) => {this.state.updateValue(e,"ename")}}/></th>
                  <th>??????<br /><br />
                    <Input type="select"  value={this.state.sort}  onChange={(e) => {this.state.updateValue(e,"sort")}}>
                      <option value=""></option>
                      <option value="SW(???????????????)">SW(???????????????)</option>
                      <option value="HW(????????????)">HW(????????????)</option>
                    </Input>
                  </th>
                  <th>??????<br /><br /><Input type="text" value={this.state.version} onChange={(e) => {this.state.updateValue(e,"version")}}/></th>
                  <th>?????????/????????????<br /><br /><Input type="text" value={this.state.serial} onChange={(e) => {this.state.updateValue(e,"serial")}}/></th>
                  <th>????????????<br /><br /><Input type="text" value={this.state.buyyear} onChange={(e) => {this.state.updateValue(e,"buyyear")}}/></th>
                  <th>????????????(???)<br /><br /><Input type="text" value={this.state.buycost} onChange={(e) => {this.state.updateValue(e,"buycost")}}/></th>
                  <th>?????? ???<br /><br />
                    <Input type="select" value={this.state.supervise}  onChange={(e) => {this.state.updateValue(e,"supervise")}}> 
                      <option value=""> </option>
                      {this.state.teams ? this.state.teams.filter(({year}) => year === new Date().getFullYear())
                      .map((c, index) => {
                        return( 
                          <option value={c.teamname} key={index}>{c.teamname}</option>     
                        );
                      })  :""}
                    </Input>
                  </th>
                  <th>?????????<br /><br /><Input type="text" value={this.state.register} onChange={(e) => {this.state.updateValue(e,"register")}}/></th>
                  <th>?????????<br /><br /><Input type="text" value={this.state.user} onChange={(e) => {this.state.updateValue(e,"user")}}/></th>
                  <th>Action<br /><br /><Button size="sm" onClick={()=>{this.state.onSave(this.state.num)}}>{this.state.num ? "??????" : "??????"}</Button></th>
                </tr>
              </thead>
              <tbody>
              {this.state.equips ? this.state.equips.map(c => {
                return( 
                  <tr key={c.num}>
                  <td>{c.ename}</td> 
                  <td>{c.sort}</td> 
                  <td>{c.version}</td>
                  <td>{c.serial}</td>
                  <td>{c.buyyear}</td>
                  <td>{c.buycost}</td>
                  <td>{c.supervise}</td>
                  <td>{c.register}</td>
                  <td>{c.user}</td>
                  <td><Button color={"warning"} className="UpdateBtn" size="sm" variant="primary" onClick={()=>{this.state.onEdit(c.num)}}>??????</Button>     |
                  <Button color={"default"} className="UpdateBtn" size="sm" variant="danger"onClick={()=>{this.state.onDelete(c.num)}}>??????</Button></td>
                </tr> // ?????? ????????? state equips ??? ?????? ?????? ??????????????? ???????????? if?????? ?????? ????????? data ??? get ?????? ???????????? ?????? ?????? ????????? ??? ????????? ????????? debug??? ??????
                  );
              })  :""}
              </tbody>
            </Table>
           </Widget>
          </Col>
        </Row>
      )
  }
}

export default Equips;

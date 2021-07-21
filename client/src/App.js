import './App.css';
import React, {Component} from 'react';
import axios from 'axios';
import ChangeRenderer from "./components/ChangeRenderer"
import PushList from "./components/PushList"

class App extends Component {
  constructor(props) {
    super(props);
    // console.log("props:  ",props);
    // console.log("Is props empty? ", this.props.item != null);
    // console.log(this.props.length);
    this.state = {
      // data: [],
      loading:true,
      // pushList: []
    }
  }
  // githubPushList={};
  async componentDidMount() {
    console.log("props in cDM: ", this.props);
    const d = await axios ("/clientdata1");
    console.log(d);
    this.setState({data: d.data});
    // console.log(this.state.data);
    
    // console.log(d.data.name);
    // console.log(d.data.files[0]);
    // .then(res => 
    //   Object.keys(res).forEach(key => this.state.pushList.push({name: key, value: res[key]}))
    // )
  }
  
  render(){  
    if (!this.state.data){
      return "Loading...";
      // return window.location.href;
    }

    // if (this.props.length == 0) { return "No data to display"};
    if (this.state.data.noData) {
      return "No Data!";
    } else {
      return (
      <div className="App">
        test in app
        {/* {console.log(this.props.length)} */}
        {/* {if this.props} */}
      <PushList data={this.state.data}/* testsubject="testioioio" *//>
      {/* <PushList pushList={this.state.pushList}/> */}
      </div>
      )
    }
  }
}

export default App;

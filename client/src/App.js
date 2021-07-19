import './App.css';
import React, {Component} from 'react';
import axios from 'axios';
import ChangeRenderer from "./components/ChangeRenderer"
import PushList from "./components/PushList"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      loading:true,
      // pushList: []
    }
  }
  // githubPushList={};
  async componentDidMount() {
    const d = await axios ("/clientdata1");
    this.setState({data: d.data});
    // console.log(this.state.data);
    
    // console.log(d.data.name);
    // console.log(d.data.files[0]);
    // .then(res => 
    //   Object.keys(res).forEach(key => this.state.pushList.push({name: key, value: res[key]}))
    // )
  }
  
  render(){  
    // if (!this.state.data){
      // return "Loading...";
    // }
    return (
      <div className="App">
        test in app
      <PushList data={this.state.data}/* testsubject="testioioio" *//>
      {/* <PushList pushList={this.state.pushList}/> */}
      </div>
    );
  }
}

export default App;

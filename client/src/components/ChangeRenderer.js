import React, {Component} from 'react';

class ChangeRenderer extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {}
    }
    render() {
        console.log(this.props)  
        let {testsubject} = this.props;
          return(
              <div>
                  <h1>test in changeRenderer</h1>
                  <h1>{testsubject}</h1>
              </div>
          );
      }
}

export default ChangeRenderer;
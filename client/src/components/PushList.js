import React, {Component} from 'react';
class PushList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.data.files);

        for (const p of props.data.files){
            console.log(p);
            for (const q in p){
                // console.log(
                console.log(q);
                // for (const r of q){
                //     console.log(r);
                }
                

        //     for (const q in p}{
        //         console.log(q);
            // }
        }
        // console.log(props.data.name);
        // console.log(props.data.files[0].sha);
        // console.log(typeof(props.data.files[0].patch));
        console.log(props.data.files[0].patch.split("\n"));
    }

    
    render() {
          const {pushList} = this.props;
          return(
              <div className="commit">
                <div>
                    <h1>test in PushList</h1>
                    {this.props.data.name}<br/>
                    {this.props.data.files[0].sha}
                    {/* <p>{this.props}</p>                 */}
                </div>
                <div>
                    {this.props.data.files[0].patch}
                </div>
              </div>
          );
      }
}

export default PushList;
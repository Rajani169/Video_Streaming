import React from 'react';
import { connect } from 'react-redux';
import { fetchStream,deleteStream } from '../../actions.js/index.js';
import Modal from '../Modal.js';
import history from '../../history.js';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component{
     renderActions = () => {
         const id= this.props.match.params.id;
    return(
        <React.Fragment>
     <button onClick={() => this.props.deleteStream(id)} className="ui negative button">Delete</button>
     <Link to='/' className="ui button" >Cancel</Link>
     </React.Fragment>
    );
     }

     renderContent = () => {
        if(!this.props.stream){
            return <div>Are you sure you want to delete this stream??</div>
        }
        return (
            <div>{`Are you sure you want to delete this stream with title: ${this.props.stream.title}`}??</div>
        );
     }

    componentDidMount(){
     this.props.fetchStream(this.props.match.params.id);
    }
    render(){
        return (
        <Modal title="Delete Stream"
        content = {this.renderContent()}
        actions={this.renderActions()}
        onDismiss = {()=> {history.push('/')}}
        />
        );
    }
   
};
const mapStateToProps =(state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, { fetchStream,deleteStream })(StreamDelete);
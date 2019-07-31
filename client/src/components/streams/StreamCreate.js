import React from 'react';
import { connect } from 'react-redux';
import StreamForm from './StreamForm.js';
import { createStream } from '../../actions.js/index.js';

 
class StreamCreate extends React.Component{

    onSubmit = (formValues) => {
    this.props.createStream(formValues);
    }
    render() {
       
        return (
           <div>
               <h3>Create a Stream</h3>
               <StreamForm onSubmit={this.onSubmit} />
           </div>
            );
    }
    
};


export default connect(null, {
    createStream: createStream
})(StreamCreate);
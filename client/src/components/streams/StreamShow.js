import React from 'react';
import { connect } from 'react-redux'; 
import { fetchStream } from '../../actions.js/index.js'; 
import flv from 'flv.js';

class StreamShow extends React.Component{
    constructor(props){
   super(props);
    this.videoRef = React.createRef();
    }
    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }
    
componentDidUpdate(){
    this.buildPlayer();
}

    buildPlayer(){
        const { id } = this.props.match.params;
        if(this.player || !this.props.stream){
            return;
        }
        this.player =  flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    componentWillUnmount(){
        this.player.destroy();
    }
    render(){
        if(!this.props.stream)
        return <div>Loading...</div>;
        
        return (
        <div>
           <video ref={this.videoRef} controls/>
           <h1>{this.props.stream.title}</h1>
           <h5>{this.props.stream.description}</h5>
        </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
    stream: state.streams[ownProps.match.params.id]
    };
    }

export default connect(mapStateToProps, { fetchStream })(StreamShow);
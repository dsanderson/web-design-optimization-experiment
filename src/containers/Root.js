import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ConnectedPareto from './Pareto';
import ConnectedOptimum from './Optimum';
import ConnectedIGrid from './IGrid';

export class Node extends Component {
    renderType = () => {
        const { type } = this.props;
        console.log(type);
        switch (type) {
            case "#pareto":
                return (<ConnectedPareto></ConnectedPareto>)
            case "#optimum":
                console.log("Rendering optimum");
                return (<ConnectedOptimum></ConnectedOptimum>)
            case "#igrid":
                return (<ConnectedIGrid></ConnectedIGrid>)
        }
    }

    render() {
        let output = this.renderType();
        return (
            <div>
                <Box>
                    <AppBar position="fixed">
                        <Toolbar>
                            <Typography>
                                Design Space Explorer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div id="main" style={{paddingTop:70}}>
                        { output }
                    </div>
                </Box>    
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return state
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode
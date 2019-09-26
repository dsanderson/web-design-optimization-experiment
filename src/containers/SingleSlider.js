import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export class SingleSlider extends Component {
    update = (event, value) => {
        const { setWeight, ownKey } = this.props;
        setWeight(ownKey, value)
    }

    render () {
        return (
            <div>
                <div>
                    <Typography>{ this.props.ownKey }: { this.props.weight }</Typography>
                </div>
                <div style={{width:400}}>
                    <Slider value={this.props.weight} min={-100} max={100} onChange={this.update}></Slider>
                </div>
            </div>
        )
    }    
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    let key = ownProps.ownKey;
    let props = {...ownProps,
        "weight": state.weights[key]
    }
    return props
}

const ConnectedSingleSlider = connect(mapStateToProps, actions)(SingleSlider)
export default ConnectedSingleSlider
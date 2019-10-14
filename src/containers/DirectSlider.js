import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export class DirectSlider extends Component {
    update = (event, value) => {
        const { setDirect, ownKey } = this.props;
        setDirect(ownKey, value)
    }

    render () {
        return (
            <div>
                <div>
                    <Typography>{ this.props.ownKey }: { this.props.value }</Typography>
                </div>
                <div style={{width:400}}>
                    <Slider value={this.props.value} min={0} max={100} onChange={this.update}></Slider>
                </div>
            </div>
        )
    }    
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    let key = ownProps.ownKey;
    let props = {...ownProps,
        "value": state.direct[key]
    }
    return props
}

const ConnectedDirectSlider = connect(mapStateToProps, actions)(DirectSlider)
export default ConnectedDirectSlider
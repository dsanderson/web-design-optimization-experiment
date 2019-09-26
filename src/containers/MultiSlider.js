import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export class MultiSlider extends Component {
    updatePoints = (event, points) => {
        const { updateGrid, ownKey, value, min, max } = this.props;
        updateGrid(ownKey, value, min, max, points)
    }

    updateRange = (event, value) => {
        const { updateGrid, ownKey, min, max, points } = this.props;
        updateGrid(ownKey, value, min, max, points)
    }

    render () {
        const { ownKey, value, min, max, points } = this.props;
        return (
            <div>
                <div>
                    <Typography>{ ownKey }: { points } points between { value[0] }-{ value[1] }</Typography>
                </div>
                <div style={{width:400}}>
                    <Typography>Range</Typography><Slider value={ value } min={min} max={max} onChange={this.updateRange}></Slider>
                </div>
                <div style={{width:400}}>
                    <Typography>Points</Typography><Slider value={ points } min={0} max={10} onChange={this.updatePoints}></Slider>
                </div>
            </div>
        )
    }    
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    let key = ownProps.ownKey;
    let props = {...ownProps,
        "value": state.grid[key].value,
        "min": state.grid[key].min,
        "max": state.grid[key].max,
        "points": state.grid[key].points
    }
    return props
}

const ConnectedMultiSlider = connect(mapStateToProps, actions)(MultiSlider)
export default ConnectedMultiSlider
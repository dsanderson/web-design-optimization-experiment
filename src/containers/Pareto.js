import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ConnectedScatterplot from './Scatterplot';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export class Pareto extends Component {
    fetchPoints = () => {
        const { fetchDesignsThunk, state } = this.props;
        fetchDesignsThunk(state)
    }

    updateParetoWeight = (event, value) => {
        const { selected, updateParetoValues } = this.props;
        updateParetoValues(selected, value)
    }

    updateParetoSelected = (event) => {
        const { updateParetoSelected } = this.props;
        event.preventDefault();
        updateParetoSelected(event.target.value)
    }

    render () {
        const { selected, keys } = this.props;
        return (
            <Box>
                <Grid container>
                    <Grid item xs={6}>
                        <ConnectedScatterplot width={600} height={600} marginLeft={60} marginRight={10} marginTop={10} marginBottom={60}/>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <div>
                                <label htmlFor="pareto">Target Axis</label>
                                <select className="form-control" name="pareto" onChange={ this.updateParetoSelected } value={selected}>
                                    { keys.map((k, i) => { return (<option value={i}>{ k }</option>) }) }
                                </select>
                            </div>
                            <div>
                                <Typography>{ keys[selected] }: { this.props[selected] }</Typography>
                            </div>
                            <div style={{width:400}}>
                                <Slider value={this.props[selected]} min={0} max={100} onChange={this.updateParetoWeight}></Slider>
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" onClick={this.fetchPoints}>Generate Pareto Frontier</Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        )
    }    
}

function mapStateToProps(state, ownProps) {
    let props = {...state.pareto, selected: state.paretoSelected, keys: state.paretoKeys, state:state};
    return props
}

const ConnectedPareto = connect(mapStateToProps, actions)(Pareto)
export default ConnectedPareto
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ConnectedScatterplot from './Scatterplot';
import ConnectedSingleSlider from './SingleSlider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export class Optimum extends Component {
    fetchPoints = () => {
        const { fetchDesignsThunk, state } = this.props;
        fetchDesignsThunk(state)
    }

    render () {
        let sliders = this.props.keys.map((k)=>(<ConnectedSingleSlider ownKey={k}></ConnectedSingleSlider>))
        console.log(sliders)
        return (
            <Box>
                <Grid container>
                    <Grid item xs={6}>
                        <ConnectedScatterplot width={600} height={600} marginLeft={60} marginRight={10} marginTop={10} marginBottom={60}/>
                    </Grid>
                    <Grid item xs={6}>
                        { sliders }
                        <div>
                            <Button variant="contained" color="primary" onClick={this.fetchPoints}>Generate Optimal Design</Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        )
    }    
}

function mapStateToProps(state, ownProps) {
    return {state:state, keys: state.keys}
}

const ConnectedOptimum = connect(mapStateToProps, actions)(Optimum)
export default ConnectedOptimum
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ConnectedScatterplot from './Scatterplot';
import ConnectedMultiSlider from './MultiSlider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export class IGrid extends Component {
    fetchPoints = () => {
        const { fetchDesignsThunk, state } = this.props;
        fetchDesignsThunk(state)
    }

    render () {
        let sliders = this.props.keys.map((k)=>(<ConnectedMultiSlider ownKey={k}></ConnectedMultiSlider>))
        return (
            <Box>
                <Grid container>
                    <Grid item xs={6}>
                        <ConnectedScatterplot width={600} height={600} marginLeft={60} marginRight={10} marginTop={10} marginBottom={60}/>
                    </Grid>
                    <Grid item xs={6}>
                        { sliders }
                        <div>
                            <Button variant="contained" color="primary" onClick={this.fetchPoints}>Generate Grid of Design</Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        )
    }    
}

function mapStateToProps(state, ownProps) {
    let props = {...ownProps,
        keys: state.gridKeys,
        state: state
    }
    return props
}

const ConnectedIGrid = connect(mapStateToProps, actions)(IGrid)
export default ConnectedIGrid
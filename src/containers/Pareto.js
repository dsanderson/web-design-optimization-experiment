import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ConnectedScatterplot from './Scatterplot';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export class Pareto extends Component {
    fetchPoints = () => {
        const { fetchDesignsThunk, state } = this.props;
        fetchDesignsThunk(state)
    }

    render () {
        return (
            <Box>
                <Grid container>
                    <Grid item xs={6}>
                        <ConnectedScatterplot width={600} height={600} marginLeft={60} marginRight={10} marginTop={10} marginBottom={60}/>
                    </Grid>
                    <Grid item xs={6}>
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
    return {state: state}
}

const ConnectedPareto = connect(mapStateToProps, actions)(Pareto)
export default ConnectedPareto
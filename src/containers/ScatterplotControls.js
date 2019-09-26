import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class ScatterplotControls extends Component {
    update = (e) => {
        e.preventDefault();
        const state = { ...this.props, [e.target.name]: e.target.value };
        console.log(state);
        console.log(this.props);
        const { updateScatterplotControls, x_axis, y_axis } = state;
        updateScatterplotControls( x_axis, y_axis );
    }

    render() {
        //console.log(this.props.keys);
        return (<form className="form-group">
            <label htmlFor="x_axis">X Axis</label>
            <select className="form-control" name="x_axis" onChange={ this.update } value={this.props.x_axis}>
                { this.props.keys.map((k, i) => { return (<option value={i}>{ k }</option>) }) }
            </select>
            <br></br>
            <label htmlFor="y_axis">Y Axis</label>
            <select name="y_axis" className="form-control" onChange={ this.update } value={this.props.y_axis}>
                { this.props.keys.map((k, i) => { return (<option value={i}>{ k }</option>) }) }
            </select>
        </form>)
    }
}

function mapStateToProps(state, ownProps) {
    const { axes, keys } = state;
    console.log(state)
    let props = {
        ...ownProps,
        "keys": keys,
        "x_axis": axes[0],
        "y_axis": axes[1]
    }
    return props
  }
  
  const ConnectedScatterplotControls = connect(mapStateToProps, actions)(ScatterplotControls)
  export default ConnectedScatterplotControls
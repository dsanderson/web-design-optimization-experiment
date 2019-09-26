import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import XAxis from "./XAxis.js"
import YAxis from "./YAxis"
import Points from "./Points"
import * as actions from '../actions'
import * as d3 from 'd3'
import ConnectedScatterplotControls from './ScatterplotControls';

export class Scatterplot extends Component {
    render() {

        const { x_axis, y_axis, width, height, marginLeft, marginRight, marginTop, marginBottom, data, keys } = this.props;

        //console.log(data);
        //console.log(dataset);
        //console.log(x_axis, y_axis);

        var innerWidth = width - marginLeft - marginRight;
        var innerHeight = height - marginTop - marginBottom;
        var innerTransform = `translate(${ marginLeft },${ marginTop })`;
        var leftAxisTransform = `translate(${ marginLeft - 10 },${ marginTop })`;
        var bottomAxisTransform = `translate(${ marginLeft },${ marginTop + innerHeight + 10 })`;

        const x = d => { return d[x_axis] };//d => { return d["value"][x_axis] };
        const y = d => { return d[y_axis] };//{ return d["value"][y_axis] };
        //console.log(data.map((d)=> d[x_axis] ));
        var xDomain = d3.extent(data.map(x));
        var yDomain = d3.extent(data.map(y));

        //console.log(xDomain, yDomain);

        var xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([0, innerWidth]);
        
        var yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([innerHeight, 0]);
        
        var colors = ["#00BFFF", "#FF615C", "#4DFF85", "#FFCE58", "#C07AEB"];
        var xValue = d => xScale(x(d));
        var yValue = d => yScale(y(d));
        var rValue = d => { return 3.0 };
        var fillValue = d => { return colors[d] };
        var strokeValue = d => { return 'none' };

        var points = data.map((d, i) => {
            return {
                x: xValue(d),
                y: yValue(d),
                r: rValue(d),
                fill: fillValue(0),
                stroke: strokeValue(d)
            };
        });

        //var bottomAxisTransform = `translate(0,${innerHeight})`;

        return (
            <div>
                <ConnectedScatterplotControls></ConnectedScatterplotControls>
                <svg 
                    className="Scatterplot"
                    width={this.props.width}
                    height={this.props.height}>

                    <g transform={innerTransform}>
                        <Points	data={points} pointId={this.props.selected_point} />
                    </g>
                    <g transform={bottomAxisTransform}>
                        <XAxis scale={xScale} n_ticks={5} x_label={ x_axis } />
                    </g>
                    <g transform={leftAxisTransform}>
                        <YAxis scale={yScale} n_ticks={5} y_label={ y_axis }/>
                    </g>

                </svg>
                { (this.props.selected_point === null || this.props.selected_point === undefined || this.props.selected_point > points.length) ? (null) : (
                    <div>
                        <h5>Selected Point</h5><a href="#" onClick={(e) => { e.preventDefault(); this.props.selectPoint(null) }}>close</a>
                        <code style={{display:"block", whiteSpace:"pre-wrap", color:"#000"}}>
                            { JSON.stringify(data[this.props.selected_point], null, 2) }
                        </code>
                    </div>
                    ) }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let keys = state.keys;
    let data = state.data;
    let x_axis = state.keys[state.axes[0]];
    let y_axis = state.keys[state.axes[1]];
    let props = {...ownProps,
        "data": data,
        "keys": keys,
        "x_axis": x_axis,
        "y_axis": y_axis,
        "selected_point": state.pointId
    }
    return props
}

const ConnectedScatterplot = connect(mapStateToProps, actions)(Scatterplot)
export default ConnectedScatterplot
import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as d3 from 'd3'

class Axis extends Component {
    render() {
        const { scale, n_ticks, x_label } = this.props;
        
        var tickSizeInner = 6,
            tickSizeOuter = 6,
            tickPadding = 3;

        //var values = tickValues == null ? (scale.ticks ?
        //    scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues;

        var ticks = scale.ticks( n_ticks );
        var tickFormat = scale.tickFormat( n_ticks );
        var range = scale.range();
        //console.log(ticks);
        
        var gTicks = ticks.map((d, i) =>{
            var position = scale(d);
            var transformString = "translate( "+position+" 0.0 )"
            return (
                <g
                    className="tick"
                    transform={ transformString }
                    key={i}>
                    <line stroke='#212529'	x1='0' y1='0' x2='0' y2='-5'/>
                    <text
                        fill='#212529'
                        textAnchor={'middle'}
                        x='0'
                        y='0'
                        dy={'1.0em'}>
                        { tickFormat(d) }
                    </text>
                </g>
            )
        });
                
        return (
                <g className="xAxis" fill="none" fontSize="16" textAnchor="end">
                    <line x1={range[0]} x2={range[range.length - 1]} y1={0} y2={0} stroke="#212529"/>
                    {gTicks}
                    <text x={(range[0]+range[1])/2.0} y={0} dy={'2.0em'} fill='#212529' textAnchor={'middle'}>{ x_label }</text> 
                </g>	
            );
    }
}

function mapStateToProps(state, ownProps) {
    return ownProps
}

const ConnectedAxis = connect(mapStateToProps, actions)(Axis)
export default ConnectedAxis
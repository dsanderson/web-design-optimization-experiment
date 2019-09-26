import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Points extends Component {
	selectPoint = (pointId) => {
		const {selectPoint} = this.props;
		selectPoint(pointId);
	};

	render() {
		var circles = this.props.data.map((d, i) => {
			return (
				<circle onClick={ () => { this.selectPoint( i ) } }
					key={i}
					cx={d.x}
					cy={d.y}
					r={d.r}
					fill={d.fill}
					stroke={d.stroke} >
				</circle>
			)
		});
		if (this.props.pointId !== null && this.props.pointId !== undefined && this.props.pointId < this.props.data.length) {
			let d = this.props.data[this.props.pointId];
			circles.unshift(
				(<circle
					key={this.props.data.length}
					cx={d.x}
					cy={d.y}
					r={d.r+3}
					fill={ "#333333" }
					stroke={d.stroke} >
				</circle>))
		}
		return (
			<g className="Points">
				{circles}
			</g>
		);
	}
}

function mapStateToProps(state, ownProps) {
	let props = {...ownProps,
		pointId: state.pointId
	}
	return props
}

const ConnectedPoints = connect(mapStateToProps, actions)(Points)
export default ConnectedPoints
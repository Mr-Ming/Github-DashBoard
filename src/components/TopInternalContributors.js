import React, { Component } from 'react';
import '../css/TopInternalContributors.css';

class TopInternalContributors extends Component {
	render() {
		const { result } = this.props;
		return (
			<div className="TopInternalContributors">
				<div className="Header">
					Top Internal Contributors
				</div>
				
			</div>
		);
	}
}

export default TopInternalContributors;
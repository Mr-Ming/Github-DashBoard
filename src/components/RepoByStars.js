import React, { Component } from 'react';
import '../css/RepoByStars.css';

class RepoByStars extends Component {
	render() {
		const { result } = this.props;
		return (
			<div className="RepoByStars">
				<div className="Header">
					Popular Repo By Stars
				</div>
				{result.length > 0 && 
					result.map((element, i) => {
						return (
							<div className="Result" key={"stars__"+i}>
							{i+1}: <a href="{ url }">{ element.repo }</a> ({ element.stars }) 
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default RepoByStars;
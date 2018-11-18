import React, { Component } from 'react';
import '../css/RepoByForks.css';

class RepoByForks extends Component {
	render() {
		const { result } = this.props;
		return (
			<div className="RepoByForks">
				<div className="Header">
					Popular Repo By Forks
				</div>
				{result.length > 0 && 
					result.map((element, i) => {
						return (
							<div className="Result" key={"forks__"+i}>
								{i+1}: <a href="{ url }">{ element.repo }</a> ({ element.forks }) 
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default RepoByForks;
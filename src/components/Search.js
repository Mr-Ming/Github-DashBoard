import React, { Component } from 'react';
import '../css/Search.css';

const ENDPOINT_GITHUB_API = 'https://api.github.com';
const ENDPOINT_FOR_POPULAR_REPO = ENDPOINT_GITHUB_API + '/search/repositories?q=org:';
const ENDPOINT_FOR_REPO= ENDPOINT_GITHUB_API + '/repos/';
const SORT_BY_STARS_QUERY_PARAM = '&order=desc&sort=stars&per_page=25';
const SORT_BY_FORKS_QUERY_PARAM = '&order=desc&sort=forks&per_page=25';

class Search extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	input: 'Mr-Ming',
    };
  }

  getPopularRepoByStars = (repo) => {
  	const { onHandlePopularRepoByStars } = this.props;

  	this.searchGithubApi(ENDPOINT_FOR_POPULAR_REPO + repo + SORT_BY_STARS_QUERY_PARAM).then((result) => {
 			let data = result.items.map(function(element){
 				return { 
 					stars: element.stargazers_count,
	 				repo: element.full_name,
	 				url: element.html_url
 				};
 			});

 			onHandlePopularRepoByStars(data);
	  });
  }

  getPopularRepoByForks = (repo) => {
  	const { onHandlePopularRepoByForks } = this.props;

  	this.searchGithubApi(ENDPOINT_FOR_POPULAR_REPO + repo + SORT_BY_FORKS_QUERY_PARAM).then((result) => {
 			let data = result.items.map(function(element){
 				return { 
 					forks: element.forks,
	 				repo: element.full_name,
	 				url: element.html_url
 				};
 			});

 			onHandlePopularRepoByForks(data);
	  });
  }

  getRepoWithContributorData(repo) {
  	const { onHandlePopularRepoByContributors } = this.props;

    fetch(ENDPOINT_FOR_POPULAR_REPO + repo + SORT_BY_FORKS_QUERY_PARAM)
    .then(response => response.json())
    .then(function (response) {
      var items = response.items;

      return Promise.all(items.map((item, index) => {
        return fetch(ENDPOINT_FOR_REPO + item.full_name + '/contributors')
        	.then(response => response.json())
          .then(function(response) {
            item.contributors = response.length;
            return item
          });
      }));     
    })
    .then(function(items) {
    	const fullData = items.map((element, index) => {
    		return { 
    			contributors:  element.contributors,
    			repo: element.full_name,
    			url: element.html_url
    		}
    	});

    	onHandlePopularRepoByContributors(fullData);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  searchGithubApi = (url) => {
  	return fetch(url)
  		.then(response => response.json())
  		.then(function(json){
  			return json
  		})
  }

  handleInputChange = (event) => {
  	this.setState({input: event.target.value});
  }

	handleOnSubmit = (event) => {
		const { input } = this.state;

		event.preventDefault();

		//this.getPopularRepoByStars(input);
		//this.getPopularRepoByForks(input);
		this.getRepoWithContributorData(input);
	}

	render() {
		return (
			<div className="Search">
				<form onSubmit={this.handleOnSubmit}>
					Github Organization Name:
					<input
						type="textbox"
						placeholder="facebook"
						onChange={this.handleInputChange}
	       	/>
	       	<button>Submit</button>
       	</form>
			</div>
		);
	}
}

export default Search;
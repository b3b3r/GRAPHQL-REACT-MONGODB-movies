import React, { Component } from 'react';
import { createReview } from '../queries/review';
import { getMovies } from '../queries/movies';
import { graphql, withApollo } from 'react-apollo';
import { flowRight as compose } from 'lodash';

class ReviewCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: ""
    }
  }
  componentDidMount() {
    //permet d'utiliser une requete meme si elle n'est pas déclarée au début
    this.props.client.query({
      query: getMovies
    }).then(movies => {
      console.log(movies);
    })
  };
  handleSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.createReview({
        variables: {
          content: this.state.terms,
          movieId: this.props.movieID
        }
      }).then(() => this.setState({ terms: "" }))
    }
  };
  render() {
    return (
      <div>
        <div className="row">
          <form className="input-field col s6">
            <label className="active">Ajouter un avis</label>
            <input type="text"
              className="validate"
              onChange={(e) => this.setState({ terms: e.target.value })}
              value={this.state.terms}
              onKeyDown={this.handleSubmit.bind(this)} />
          </form>
        </div>
      </div>
    )
  }
}

export default compose(
  withApollo,
  graphql(createReview, {
    name: "createReview",
  })
)(ReviewCreate);
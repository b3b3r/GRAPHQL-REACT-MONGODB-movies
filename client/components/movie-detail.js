import React, { Component } from 'react';
import { Link } from 'react-router';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { getMovie } from '../queries/movies';
import ReviewCreate from './review-create';
import ReviewList from './review-list';

class MovieDetail extends Component {
  render() {
    if (this.props.getMovie.loading) {
      return <div>"En chargement ..."</div>
    } else {
      return (
        <div>
          <h1>Écrire un avis: {this.props.getMovie.movie.title}</h1>
          <Link to="/movies">Retour à la liste des films</Link>
          <ReviewList reviews={this.props.getMovie.movie.reviews} />
          <ReviewCreate movieID={this.props.params.id} />
        </div>
      )
    }
  }
}

export default compose(
  graphql(getMovie, {
    name: "getMovie",
    options: (props) => {
      return {
        variables: { id: props.params.id }
      }
    }
  })
)(MovieDetail);
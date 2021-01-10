import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getMovies, deleteMovie } from '../queries/movies';

class MovieList extends Component {
  renderMovies() {
    const divStyle = {
      cursor: "pointer"
    };
    if (!this.props.getMovies.loading) {
      return this.props.getMovies.movies.map(({ id, title }) => (
        <li className="collection-item" key={id}>
          <Link to={`/movie/${id}`}>{title}</Link>
          <i className="material-icons secondary-content" style={divStyle} onClick={() => this.removeMovie(id)} >delete</i>
        </li>
      ));
    } else {
      return "Les données chargent ...";
    }
  };
  removeMovie(id) {
    this.props.deleteMovie({
      variables: {
        id
      }
    }).then(() => this.props.getMovies.refetch())
  };
  render() {
    return (
      <div>
        <h1>Liste de films</h1>
        <ul className="collection">
          {this.renderMovies()}
        </ul>
        <Link to="/movies/create" className="btn-floating btn-large waves-effect waves-light blue right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

export default compose(
  graphql(getMovies, { name: "getMovies" }),
  graphql(deleteMovie, { name: "deleteMovie" }),
)(MovieList);
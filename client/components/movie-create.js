import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import { addMovie, getMovies } from '../queries/movies';

class MovieCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      errors: []
    }
  }
  handleSubmit(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.mutate({
        variables: {
          title: this.state.term
        },
        refetchQueries: [{ query: getMovies }]
      }).then(() => {
        hashHistory.push("/movies")
      }).catch(err => {
        this.setState({
          errors: [...err.graphQLErrors.map(({ message }) => message)]
        })
      })
    }
  }
  displayErrors() {
    return this.state.errors.map((message, index) => (
      <div key={index} style={{ color: "red" }}>
        {message}
      </div >
    ))
  }
  render() {
    return (
      <div>
        <h1>Ajouter un film</h1>
        <form className="input-field col s6">
          <label className="active">Titre du film</label>
          <input type="text"
            className="validate"
            onChange={e => this.setState({ term: e.target.value })}
            onKeyDown={this.handleSubmit.bind(this)} />
        </form>
        {this.displayErrors()}
      </div>
    )
  }
}

export default graphql(addMovie)(MovieCreate);
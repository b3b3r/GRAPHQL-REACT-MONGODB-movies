import React, { Component } from 'react';
import { likeReview } from '../queries/review';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

class ReviewList extends Component {
  addLike(id, oldLikes) {
    this.props.likeReview({
      variables: { id },
      optimisticResponse: { //permet d'afficher un résultat avant d'obtenir une réponse du serveur
        __typename: "Mutation",
        likeReview: {
          id,
          __typename: "ReviewType",
          likes: oldLikes + 1 // le préresultat permet d'afficher une valeur plus rapidement
        }
      }
    });
  };
  displayReview() {
    const divStyle = {
      cursor: "pointer"
    };
    return (
      <ul className="collection">
        {this.props.reviews.map(({ id, content, likes }) => (
          <li key={id} className="collection-item">
            {content}
            <div className="secondary-content" style={divStyle}>
              <i className="material-icons" onClick={() => this.addLike(id, likes)} >thumb_up</i>
              {likes}
            </div>
          </li>
        ))}
      </ul>)
  }

  render() {
    return (
      <div>
        {this.props.reviews.length !== 0 && this.displayReview()}
      </div>
    )
  }
}

export default compose(
  graphql(likeReview, {
    name: "likeReview",
  })
)(ReviewList);

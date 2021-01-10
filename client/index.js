import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from "apollo-link-http";
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import MovieList from './components/movie-list';
import MovieCreate from './components/movie-create';
import MovieDetail from './components/movie-detail';

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URI
});
const cache = new InMemoryCache({});
const client = new ApolloClient({
  cache,
  link: httpLink,
  dataIdFromObject: result => result.id // permet de relancer le fetch automatiquement dès lors qu'un id est détecté dans le retour
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRedirect to="/movies" />
          <Route path="/movies" component={MovieList} />
          <Route path="/movies/create" component={MovieCreate} />
          <Route path="/movie/:id" component={MovieDetail} />
        </Route>
        <MovieList />
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

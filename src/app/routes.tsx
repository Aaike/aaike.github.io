import * as React from 'react';
import Router, {Route, IndexRoute} from 'react-router';
// import {ArticleDecorator as wrapArticle} from 'gooy-react-ui';

import App from './App';
import Home from './pages/Home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}/>
  </Route>
);

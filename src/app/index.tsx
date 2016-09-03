/// <reference path="./index.d.ts"/>

import * as React from 'react';
// import ReactDOMServer from 'react-dom/server';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
// import { IntlProvider } from 'react-intl';
// import ReactRouterRelay from 'react-router-relay';

// import { bootstrapper } from 'gooy-react-app';
// import MainLayout from 'gooy-react-app/lib/MainLayoutClassnames';
import routes from './routes';
import { config } from './config';

// export {logger} from './logging';

render(<Router
  history={browserHistory}
  routes={routes}
/>, document.getElementById('root'));

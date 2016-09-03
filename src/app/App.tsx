import * as React from 'react';
import { Component, PropTypes } from 'react';
import {render} from 'react-dom';

import '../styles/style.scss';

import {menuNavItems} from './config';

// import {logger} from './logging';

import {Util} from './core';

class App extends Component<any, any> {

  static propTypes:any = {
    children: PropTypes.any,
  }

  static defaultProps:any = {};

  static contextTypes:any = {
    history: PropTypes.object,
    breakpoints: PropTypes.object,
  };

  state:any;
  props:any;

  constructor(props, state) {
    super(props);

    // initial application state
    this.state = {

    };

    // create bound methods
    // Util.bind(this, this, ['handleNav']);
  }

  render():any {
    return (
      <div id="app" ref="base">
        <div id="app-container" className="app-container">
          {this.props.children}
          <div className="app-footer">
            &copy;2015 AcmeCorp
          </div>
        </div>
      </div>
    );
  }

}

export default App;

module.hot.accept = () => {
  console.log(arguments);
}

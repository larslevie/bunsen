import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

const eachEl = fn =>
  _.each(document.getElementsByClassName('rg-component'), fn);

export const mount = el => {
  if (el.componentIsMounted) return;
  const data = $(el).data();
  if (!data.componentName) return;

  const Component = require(`assets/src/components/${
    data.componentName
  }/index.js`).default;

  el.componentIsMounted = true;

  ReactDOM.render(<Component {...data} />, el);
};

export const mountAll = _.partial(eachEl, mount);

export const unmount = el => {
  if (ReactDOM.unmountComponentAtNode(el)) el.componentIsMounted = false;
};

export const unmountAll = _.partial(eachEl, mount);

$(mountAll);

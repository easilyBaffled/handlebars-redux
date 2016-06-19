'use strict';

import App from './components/App.js';
import components from './components/main.js';
import Cookie from 'tiny-cookie';
import Handlebars from 'handlebars/runtime';
import { connect, registerComponents} from 'handlebars-redux';
import { createStore } from 'redux';
import { initWithData } from './actions';
import { todoApp } from './reducer';

let store = createStore(todoApp);

// This attaches the component helper to our handlebars runtime
// along with any child components that are to be dynamically generated w/n .hbs
registerComponents(Handlebars, components, store);
// This connects our store to our root component. All of our state changes
// will go through this route component and filter down to the child components
connect(store, new App(document.getElementById('todo-app')));
// This is a listener to passively save our todo state, so that when we
// reload the page, we can re-init the app
const cookieParam = 'TodoAppData-1';

if (Cookie.get(cookieParam)) {
    store.dispatch(initWithData(JSON.parse(Cookie.get(cookieParam))));
}

store.subscribe(function() {
    Cookie.set(cookieParam, JSON.stringify(store.getState()));
});

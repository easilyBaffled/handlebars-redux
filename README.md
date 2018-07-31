# handlebars-redux-example

[![Greenkeeper badge](https://badges.greenkeeper.io/easilyBaffled/handlebars-redux.svg)](https://greenkeeper.io/)

## Overview

Demo at https://researchsquare.github.io/handlebars-redux-example/

This is a small todo app example using [handlebars-redux](https://github.com/researchsquare/handlebars-redux). The overall structure of this app can be described as follows:
 - An app is comprised of a list of components (see `assets/scripts/components/`)
 - Each component has an associated handlebars template  (see `assets/scripts/templates/`)
 - The todolist state is contained in `assets/scripts/reducer.js`
 - Any action that triggers a change to the state is in `assets/scripts/actions.js`

## How the app works

When the page is loaded, we create a new store based on our reducer. We then call `connect` from [handlebars-redux](https://github.com/researchsquare/handlebars-redux) to attach our root element, [App.js](https://github.com/researchsquare/handlebars-redux-example/blob/master/assets/scripts/app.js).

Each time an action is dispatched, it triggers a change in state. That change is injected into the `App.js` component and all of the child components (see [https://github.com/researchsquare/handlebars-redux-example/tree/master/assets/scripts/components](https://github.com/researchsquare/handlebars-redux-example/tree/master/assets/scripts/components))

## How to build the app

 - `npm install` : to install the dependencies needed
 - `npm run watch` : Initially builds the javascript, and watches for any changes
 - `npm run build` : builds the javascript, and minifies the output



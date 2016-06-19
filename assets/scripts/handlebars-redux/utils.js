'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerComponents = registerComponents;
exports.connect = connect;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _nodeDeepcopy = require('node-deepcopy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerComponents(Handlebars, components, store) {
    if ('component' in Handlebars.helpers) {
        return;
    }

    // The component helper gives us the ability to create a component with child components.
    // An example component would look like
    // <div id="app">
    //    {{{component 'Header'}}}
    //    {{{component 'Body'}}}
    //    {{{component 'ContentWithId' id='content-with-id'}}}
    //    {{{component 'ContentWithData' props='data'}}} <- this data is available via data.hash.pros
    // </div>
    var dispatch = function dispatch(action) {
        store.dispatch(action);
    };
    Handlebars.registerHelper('log', function (input, data) {
      console.log('logging helper', input);
    });
    Handlebars.registerHelper('component', function (name, data) { // Nam
        var divName = null;

        if (data.hash.id) {
            divName = data.hash.id;
        } else {
            divName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            divName = 'handlebar-component-' + divName + (data.hash.key||'0'); // possibly manually check the parent for others of this type
        }
        // Make sure we don't load up multiple copies of the child component
        var componentIndex = data.data.root.component._componentIds.indexOf(divName);
        var component;
        console.log('component helper: ', name, data, componentIndex);
        if (componentIndex  === -1 && divName !== 'root') {
          data.data.root.component._componentIds.push(divName);
          component = new components[name](divName); //This is where the CMP objects are, you must create an instance of it and save that to the room cmp
          component.setDispatch(dispatch);
          data.data.root.component.components.push(component);
        } else {
          component = data.data.root.component.components[componentIndex];
        }

        //ensure the cmp is wrapped by it's id
        setTimeout(() => component.bindActions(), 0);
        return '<div id="' + divName + '" data-component="' + name + '">'+component.render(data.hash)+'</div>';
    });
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
var domElement = function domElement(identifier) {
    if ((typeof identifier === 'undefined' ? 'undefined' : _typeof(identifier)) === 'object') {
        return identifier;
    }

    return document.getElementById(identifier);
};

function connect(store, component) {
    var unsubscribe = null;

    var dispatch = function dispatch(action) {
        store.dispatch(action);
    };
    /*
    * app element to DOM anchor element
    */
    var handleStateChange = function handleStateChange() {
        var el = domElement(component.el);
        component.setDispatch(dispatch);
        el.innerHTML = component.render((0, _nodeDeepcopy.deepCopy)(store.getState()));
    };

    var trySubscribe = function trySubscribe(stateChangeHandler) {
        if (!unsubscribe) {
            unsubscribe = store.subscribe(handleStateChange);
            handleStateChange();
        }
    };

    trySubscribe();
}

'use strict';

import appTemplate from './../templates/app.hbs';
import { HandlebarsComponent } from 'handlebars-redux';

// Components roughly follow the React lifecycle. You can:
//  - use `shouldComponentUpdate` to determine if `render` should be called
//  - use `componentDidUpdate` to manipulate anything in the dom
//  - Use `properties` (a list of property keys) to indicate what properties matter to this
//    component
class App extends HandlebarsComponent
{
    shouldComponentUpdate(props, state)
    {
        return false;
    }

    constructor(el)
    {
        super();
        this.view = appTemplate;
        this.init(el);
    }
}

export default App;

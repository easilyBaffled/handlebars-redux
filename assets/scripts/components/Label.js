'use strict';

import getFormData from 'get-form-data';
import labelTemplate from './../templates/label.hbs';
import { clearForm } from './../utils';
import { createListNamed } from './../actions.js';
import { HandlebarsComponent } from 'handlebars-redux';
import { setList } from './../actions.js';

// Components roughly follow the React lifecycle. You can:
//  - use `shouldComponentUpdate` to determine if `render` should be called
//  - use `componentDidUpdate` to manipulate anything in the dom
//  - Use `properties` (a list of property keys) to indicate what properties matter to this
//    component
class Label extends HandlebarsComponent
{
    constructor(el)
    {
        super();
        this.view = labelTemplate;
        this.init(el);
    }
}

export default Label;

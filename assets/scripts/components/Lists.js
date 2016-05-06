'use strict';

import getFormData from 'get-form-data';
import listsTemplate from './../templates/lists.hbs';
import { clearForm } from './../utils';
import { createListNamed } from './../actions.js';
import { HandlebarsComponent } from 'handlebars-redux';
import { setList } from './../actions.js';

// Components roughly follow the React lifecycle. You can:
//  - use `shouldComponentUpdate` to determine if `render` should be called
//  - use `componentDidUpdate` to manipulate anything in the dom
//  - Use `properties` (a list of property keys) to indicate what properties matter to this
//    component
class Lists extends HandlebarsComponent
{
    constructor(el)
    {
        super();
        this.properties = ['lists', 'list'];
        this.view = listsTemplate;
        this.init(el);
    }

    selectList(e, params)
    {
        this.dispatch(setList(params.id));
    }

    AddTodoList(e, params)
    {
        e.preventDefault();
        let formData = getFormData(e.target);
        this.dispatch(createListNamed(formData.listName));
        clearForm(e.target);
    }
}

export default Lists;

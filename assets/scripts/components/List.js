'use strict';

import getFormData from 'get-form-data';
import listTemplate from './../templates/list.hbs';
import { clearForm } from './../utils';
import { createTodo, closeList, setTodoStatus } from './../actions.js';
import { HandlebarsComponent } from 'handlebars-redux';

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
        this.properties = ['list'];
        this.view = listTemplate;
        this.init(el);
    }

    toggleTodoStatus(e, params)
    {
        var done = !(params.status == 'true');
        this.dispatch(setTodoStatus(params.todoId, params.listId, done));
    }

    closeList(e, params)
    {
        this.dispatch(closeList());
    }

    addTodo(e, params)
    {
        e.preventDefault();
        let formData = getFormData(e.target);
        this.dispatch(createTodo(formData.todo, params.listId));
        clearForm(e.target);

        document.getElementById('todo-text').focus();
    }
}

export default Lists;

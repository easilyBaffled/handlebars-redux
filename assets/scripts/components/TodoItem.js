'use strict';

import getFormData from 'get-form-data';
import todoItemTemplate from './../templates/todoItem.hbs';
import { clearForm } from './../utils';
import { setTodoStatus } from './../actions.js';
import { HandlebarsComponent } from 'handlebars-redux';

// Components roughly follow the React lifecycle. You can:
//  - use `shouldComponentUpdate` to determine if `render` should be called
//  - use `componentDidUpdate` to manipulate anything in the dom
//  - Use `properties` (a list of property keys) to indicate what properties matter to this
//    component
class TodoItem extends HandlebarsComponent
{
    constructor(el)
    {
        super();
        this.view = todoItemTemplate;
        this.init(el);
    }

    toggleTodoStatus(e, params)
    {
        console.log('func params', params, this.props);
        var done = !(params.status == 'true');
        this.dispatch(setTodoStatus(params.todoId, params.listId, done));
    }


}

export default TodoItem;

'use strict';

import _ from 'underscore';
import { CREATE_TODO, CLOSE_LIST, CREATE_LIST, SET_LIST, INIT_WITH_DATA, SET_TODO_STATUS } from './actions';

const initialState = {
    lists: [],
    list: null,
    test: 'A Test'
};

function itemById(id, items) {
    return _.find(items, function (item) {
        return item.id === id;
    });
}

// This takes the information provided from `./actions.js` and manipulates
// the global state that is passed to all components
export function todoApp(state=initialState, action)
{
    switch (action.type) {
        case INIT_WITH_DATA:
            return _.extend(state, action.data);
        case CLOSE_LIST:
            state.list = null;
            return state;
        case SET_LIST:
            return _.extend(state, {
                list: itemById(action.listId, state.lists)
            });
        case CREATE_LIST:
            return _.extend(state, {
                list: action.list,
                lists: state.lists.concat(action.list)
            });
        case CREATE_TODO:
            var list = itemById(action.listId, state.lists);
            list.todos.push(action.todo);

            return _.extend(state, {
                list: list
            });
        case SET_TODO_STATUS:
            var list = itemById(action.listId, state.lists);
            var todo = itemById(action.todoId, list.todos);
            todo.done = action.done;

            return _.extend(state, {
                list: list
            });
        default:
            return state;
    }
}

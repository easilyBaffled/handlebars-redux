'use strict';

import uuid from 'node-uuid';

// This file contains a list of functions that can influence our state
// Each of these functions are associated with a constant that
// tell `./reducer.js` how to update the state

export const SET_LIST = 'SET_LIST';
export function setList(listId) {
    return {
        type: SET_LIST,
        listId
    };
}

export const CREATE_LIST = 'CREATE_LIST';
export function createListNamed(listName) {
    let list = {
        name: listName,
        id: uuid.v4(),
        todos: []
    };

    return {
        type: CREATE_LIST,
        list
    };
}

export const CLOSE_LIST = 'CLOSE_LIST';
export function closeList() {
    return {
        type: CLOSE_LIST
    };
}

export const CREATE_TODO = 'CREATE_TODO';
export function createTodo(todoText, listId) {
    console.log('updating');
    let todo = {
        text: todoText,
        id: uuid.v4(),
        done: false
    };

    return {
        type: CREATE_TODO,
        todo,
        listId
    };
}

export const SET_TODO_STATUS = 'SET_TODO_STATUS';
export function setTodoStatus(todoId, listId, done) {
    return {
        type: SET_TODO_STATUS,
        todoId,
        listId,
        done
    };
}

export const INIT_WITH_DATA = 'INIT_WITH_DATA';
export function initWithData(data) {
    return {
        type: INIT_WITH_DATA,
        data
    };
}

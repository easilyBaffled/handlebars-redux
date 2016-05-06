'use strict';

import _ from 'underscore';

// Naive form cleanup helper. Just empties all values (definitely problematic w/ input[type='submit'])
export function clearForm(form) {
    _.each(form.elements, function (el) {
        el.value = '';
    });
}

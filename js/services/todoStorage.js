/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from firebase
 */
todomvc.service('todoStorage', function ($firebase) {
    var url = 'https://todomvc-angular.firebaseio.com/';
    var fireRef = new Firebase(url);

    var todos = $firebase(fireRef).$asArray();

    return {
        get: function () {
            return todos.$loaded();
        },

        add: function (todo) {
            return todos.$add(todo);
        },

        remove: function (todo) {
            return todos.$remove(todo);
        },

        save: function (todo) {
            return todos.$save(todo);
        }
    };
});

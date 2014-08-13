/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $filter, $q, todoStorage) {
    $scope.newTodo = '';
    $scope.editedTodo = null;

    todoStorage.get().then(function (todos) {
        $scope.todos = todos;
        $scope.remainingCount = $filter('filter')(todos, {completed: false}).length;
    });

    if ($location.path() === '') {
        $location.path('/');
    }

    $scope.isSelected = function(path){
        return $location.path() == '/' + path;
    };

    $scope.$watch(function(){
        return $location.path();
    }, function (path) {
        $scope.statusFilter = { '/active': {completed: false}, '/completed': {completed: true} }[path];
    });

    $scope.$watch('remainingCount == 0', function (val) {
        $scope.allChecked = val;
    });

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo.trim();
        if (newTodo.length === 0) {
            return;
        }

        todoStorage.add({
            title: newTodo,
            completed: false
        }).then(function () {
            $scope.newTodo = '';
            $scope.remainingCount++;
        });
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
        // Clone the original todo to restore it on demand.
        $scope.originalTodo = angular.extend({}, todo);
    };

    $scope.doneEditing = function (todo) {
        $scope.editedTodo = null;
        todo.title = todo.title.trim();

        if (!todo.title) {
            $scope.removeTodo(todo);
        }

        todoStorage.save(todo);
    };

    $scope.revertEditing = function (todo) {
        todos[todos.indexOf(todo)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    };

    $scope.removeTodo = function (todo) {
        todoStorage.remove(todo).then(function () {
            $scope.remainingCount -= todo.completed ? 0 : 1;
        });
    };

    $scope.todoCompleted = function (todo) {
        todoStorage.save(todo).then(function () {
            $scope.remainingCount += todo.completed ? -1 : 1;
        });
    };

    $scope.clearCompletedTodos = function () {
        angular.forEach($scope.todos, function (todo) {
            if (todo.completed) {
                todoStorage.remove(todo);
            }
        });
    };

    $scope.markAll = function (completed) {
        var allSave = [];

        angular.forEach($scope.todos, function (todo) {
            todo.completed = !completed;
            allSave.push(todoStorage.save(todo));
        });

        $q.all(allSave).then(function () {
            $scope.remainingCount = completed ? todos.length : 0;
        });
    };
});

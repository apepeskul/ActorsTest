
var testmodule = angular.module('testModule', []);

testmodule.controller('ctrlTest', function ($scope, $filter) {

    $scope.sort = {
        sortingOrder : 'product',
        reverse : false
    };

    $scope.gap = 5;

    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.sortedItems = [];
    $scope.currentPage = 0;
    $scope.items = [
        {"product":"Говядина","product_group":"Мясо","proteins":"1","fats":"31","carbohydrates":"2","calories":"1"},
        {"product":"Баранина","product_group":"Мясо","proteins":"1","fats":"1","carbohydrates":"1","calories":"3"},
        {"product":"Свинина","product_group":"Мясо","proteins":"12","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Телятина","product_group":"Мясо","proteins":"3","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Яблоко","product_group":"Фрукты","proteins":"1","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Молоко","product_group":"Молочные продукты","proteins":"6","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Творог","product_group":"Молочные продукты","proteins":"4","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Сметана","product_group":"Молочные продукты","proteins":"8","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Хлеб","product_group":"Хлеб","proteins":"11","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Масло","product_group":"Молочные продукты","proteins":"34","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Картошка","product_group":"Овощи","proteins":"1","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Арбуз","product_group":"Овощи","proteins":"0","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Конопля","product_group":"Трава","proteins":"10","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Гашиш","product_group":"Трава","proteins":"999","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Мак","product_group":"Трава","proteins":"1","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Гречка","product_group":"Крупы","proteins":"2","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Манка","product_group":"Крупы","proteins":"4","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Рис","product_group":"Крупы","proteins":"65","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Редиска","product_group":"Овощи","proteins":"1","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Помидор","product_group":"Овощи","proteins":"4","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Огурец","product_group":"Овощи","proteins":"52","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Еще какая то хуйня","product_group":"Другое","proteins":"56","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Все надоело","product_group":"Другое","proteins":"8","fats":"1","carbohydrates":"1","calories":"1"},
        {"product":"Точно все","product_group":"Другое","proteins":"74","fats":"1","carbohydrates":"1","calories":"2"}
    ];

    $scope.search = function () {
        if ($scope.sort.sortingOrder !== '') {
            $scope.sortedItems = []
            $scope.sortedItems = $filter('orderBy')($scope.items, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.sortedItems.forEach(function(i){console.log(i)})
        $scope.groupToPages();
    };

    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.items.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.sortedItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.sortedItems[i]);
            }
        }
    };

    $scope.range = function (size,start, end) {
        var ret = [];
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.search();
});


testmodule.$inject = ['$scope', '$filter'];

testmodule.directive("customSort", function() {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            order: '=',
            sort: '='
        },
        template :
            ' <a ng-click="sort_by(order)" style="color: #555555;">'+
            '    <span ng-transclude></span>'+
            '</a>',
        link: function(scope) {

            // change sorting order
            scope.sort_by = function(newSortingOrder) {
                var sort = scope.sort;

                if (sort.sortingOrder == newSortingOrder){
                    sort.reverse = !sort.reverse;
                }

                sort.sortingOrder = newSortingOrder;
            };
        }
    }
});

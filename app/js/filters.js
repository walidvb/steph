'use strict';

/* Filters */

angular.module('myApp.filters', []).
filter('unsafe', ['$sce',function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]).
filter('interpolate', ['version', function(version) {
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	}
}]);

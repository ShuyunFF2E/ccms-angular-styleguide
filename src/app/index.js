/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-19
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import components from '../components';
import systemModule from './system';
import userModule from './user';

import appTplUrl from './app.html';

appRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function appRouter($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider.state('app', {
		url: '/',
		templateUrl: appTplUrl
	});
}

export default angular
	.module('app', [components, uiRouter, ngResource, systemModule, userModule])
	.config(appRouter)
	.run(['$rootScope', '$state', ($rootScope, $state) => {
		$rootScope.$state = $state;
	}])
	.name;

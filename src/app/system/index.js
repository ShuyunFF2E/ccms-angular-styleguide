/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-27
 */

import './_system.scss';

import angular from 'angular';

import Router from './router';

systemRouter.$inject = ['$stateProvider'];
function systemRouter($stateProvider) {
	$stateProvider.state('app.system', Router.SYSTEM);
}

export default angular.module('app.system', [])
	.config(systemRouter)
	.name;

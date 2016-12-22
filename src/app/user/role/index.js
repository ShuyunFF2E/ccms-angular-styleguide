/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

import angular from 'angular';

import Router from './router';
import './_user-role.scss';

userRoleRouter.$inject = ['$stateProvider'];
function userRoleRouter($stateProvider) {
	$stateProvider.state('app.user.role', Router.ROLE);
}

export default angular.module('app.user.role', [])
	.config(userRoleRouter)
	.name;

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-27
 */

import angular from 'angular';

import userRoleModule from './role';

import Router from './router';

userRouter.$inject = ['$stateProvider'];
function userRouter($stateProvider) {

	$stateProvider.state('app.user', Router.USER);
}

export default angular.module('ccms.app.user', [userRoleModule])
	.config(userRouter)
	.name;

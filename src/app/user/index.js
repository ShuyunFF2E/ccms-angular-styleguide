/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-27
 */

import angular from 'angular';

import userRoleModule from './role';

import userTplUrl from './user.html';
import UserCtrl from './UserCtrl';

userRouter.$inject = ['$stateProvider'];
function userRouter($stateProvider) {

	$stateProvider.state('app.user', {
		url: 'user',
		templateUrl: userTplUrl,
		controller: UserCtrl,
		controllerAs: '$ctrl'
	});
}

export default angular.module('app.user', [userRoleModule])
	.config(userRouter)
	.name;

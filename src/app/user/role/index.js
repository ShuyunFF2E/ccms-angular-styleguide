/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

import angular from 'angular';
import userTplUrl from './user-role.html';
import UserRoleCtrl from './UserRoleCtrl';

userRoleRouter.$inject = ['$stateProvider'];
function userRoleRouter($stateProvider) {

	$stateProvider.state('app.user.role', {
		url: '/role',
		templateUrl: userTplUrl,
		controller: UserRoleCtrl,
		controllerAs: '$ctrl'
	});
}

export default angular.module('app.user.role', [])
	.config(userRoleRouter)
	.name;

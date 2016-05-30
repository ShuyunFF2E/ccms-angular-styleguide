/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-27
 */

import angular from 'angular';
import systemTplUrl from './index.html';
import SystemCtrl from './SystemCtrl';

systemRouter.$inject = ['$stateProvider'];
function systemRouter($stateProvider) {

	$stateProvider.state('app.system', {
		url: 'system',
		templateUrl: systemTplUrl,
		controller: SystemCtrl,
		controllerAs: '$ctrl'
	});
}

export default angular.module('app.system', [])
	.config(systemRouter)
	.name;

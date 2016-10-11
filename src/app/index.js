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

import './index.scss';

export default angular
	.module('ccms.app', [components, uiRouter, ngResource, systemModule, userModule])
	.run(['$state', ($state) => {
		$state.go('app.user');
	}])
	.name;

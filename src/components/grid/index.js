/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-04
 */

import template from './grid.tpl.html';
import controller from './GridCtrl';

import angular from 'angular';

const gridDDO = {
	template,
	controller,
	bindings: {
		columnsDef: '<',
		data: '<'
	}
};

export default angular.module('app.components.grid', [])
	.component('grid', gridDDO)
	.name;

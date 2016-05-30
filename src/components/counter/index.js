/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

import angular from 'angular';

import template from './counter.tpl.html';
import controller from './CounterCtrl';

const ddo = {
	template,
	controller,
	bindings: {
		counter: '<init'
	}

};

export default angular.module('app.components.grid', [])
	.component('counter', ddo)
	.name;

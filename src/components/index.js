/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-04
 */

import angular from 'angular';

import counter from './counter';

export default angular
	.module('app.components', [
		counter
	])
	.name;

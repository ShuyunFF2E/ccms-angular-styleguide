/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-04
 */

import angular from 'angular';

import grid from './grid';
import counter from './counter';

export default angular
	.module('app.components', [
		grid,
		counter
	])
	.name;

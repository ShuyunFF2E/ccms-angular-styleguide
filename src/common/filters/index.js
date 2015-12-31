/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-24
 */

import angular from 'angular';
import Factory from '../utils/Factory';
import Reverse from './Reverse';

export default angular
  .module('filters', [])
  .filter('reverse', Factory.create(Reverse))
  .name;

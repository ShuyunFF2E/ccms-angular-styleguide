/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-23
 */

import App from './App';
import Factory from '../utils/Factory';
import Logger from './Logger';

export default angular
  .module('app.services', [])
  .factory('app', Factory.create(App))
  .service('logger', Logger)
  .name;

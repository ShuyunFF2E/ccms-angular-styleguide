/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-23
 */

import angular from 'angular';
import services from '../common/services';
import filters from '../common/filters';
import components from '../common/components';

function runBlock(app, logger) {
  logger.info(`angular es6 seed v${app.version} bootstrap!`);
}

runBlock.$inject = ['app'];

class AppCtrl {

  constructor(logger) {
    logger.info(`controller bootstrap!`);
    this.author = 'kuitos';
    this.counter = 10;
  }

}

AppCtrl.$inject = ['logger'];

angular
  .module('app', [services, filters, components])
  .controller('AppCtrl', AppCtrl)
  .run(runBlock);

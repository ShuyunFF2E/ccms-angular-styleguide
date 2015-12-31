/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-23
 */

export default class App {

  constructor($log) {

    $log.info('angular es6 seed!');

    return {
      version: '1.0.0'
    };

  }

};

App.$inject = ['$log'];

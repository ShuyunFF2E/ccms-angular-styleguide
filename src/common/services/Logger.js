/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-23
 */

class Logger {

  constructor($log) {

    $log.info('Logger init!');
    this.$log = $log;

  }

  info() {
    const $log = this.$log;
    $log.info.apply($log, arguments);
  }

  error() {
    const $log = this.$log;
    $log.error.apply($log, arguments);
  }

}

Logger.$inject = ['$log'];

export default Logger;

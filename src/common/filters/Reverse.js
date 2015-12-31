/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-24
 */

import '../services/Logger';

export default class Reverse {

  constructor(logger) {
    logger.info('filter init!');
    return input => input.split('').reverse().join('');
  }

};

Reverse.$inject = ['logger'];
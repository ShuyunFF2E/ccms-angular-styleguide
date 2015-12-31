/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-24
 */
import angular from 'angular';
import Factory from '../../utils/Factory';
import counterTpl from './counter.html';
import './counter.css';

class CounterController {

  constructor() {
    this.counter = this.counter || 0;
  }

  count() {
    this.counter++;
  }

  get counterSquare() {
    return this.counter * this.counter;
  }
}

class Counter {

  constructor() {

    this.restrict = 'E';
    this.template = counterTpl;
    this.controller = CounterController;
    this.controllerAs = 'counter';
    this.bindToController = true;
    this.scope = {
      counter: '='
    };

  }

}

export default angular
  .module('components.counter', [])
  .directive('counter', Factory.create(Counter))
  .name;

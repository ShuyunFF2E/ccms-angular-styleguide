/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-12-29
 */

export default class Factory {

  static create(Constructor) {

    function factory(...args) {
      return new Constructor(...args);
    }

    factory.$inject = Constructor.$inject || [];

    return factory;

  }

}

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

import { Debounce } from 'angular-es-utils/decorators';

export default class CounterCtrl {

	$onInit() {
		this.counter = Number(this.counter || 0);
	}

	get counterSquare() {
		return this.counter * this.counter;
	}

	@Debounce(100)
	increase() {
		this.counter++;
	}

}

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

export default class CounterCtrl {

	$onInit() {
		this.counter = Number(this.counter || 0);
	}

	get counterSquare() {
		return this.counter * this.counter;
	}

	increase() {
		this.counter++;
	}

}

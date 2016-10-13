/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

import { Inject } from 'angular-es-utils/decorators';

@Inject('$state')
export default class UserCtrl {

	constructor() {
		this._$state.go('app.user.role');
	}
}

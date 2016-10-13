/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-10-13
 */

import { Inject } from 'angular-es-utils/decorators';

import { ShopResource, MenuResource } from '../common/resources';

@Inject('$state')
export default class AppCtrl {

	menusOptions = {
		unfold: true,
		menusResource: MenuResource,
		shopsResource: ShopResource,
		searchPlaceholder: '请输入XXX'
	};

	constructor() {
		this._$state.go('app.user');
	}

}

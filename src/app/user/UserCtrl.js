/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

export default class UserCtrl {

	constructor() {
		this.name = 'user';
		this.data = [
			{ name: 'l', age: 20, gender: '男' },
			{ name: 'k', age: 20, gender: '男' },
			{ name: 'lk', age: 20, gender: '不详' }
		];
		this.columnsDef = [
			{ displayName: '姓名', field: 'name' },
			{ displayName: '年龄', field: 'age' },
			{ displayName: '性别', field: 'gender' }
		];
	}
}

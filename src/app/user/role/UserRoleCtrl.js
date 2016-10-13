/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-05-30
 */

import { GridResource } from '../../../common/resources';

export default class UserRoleCtrl {

	userRole = '超级赛亚人';

	pagerGridOptions = {

		resource: GridResource,
		response: null,
		queryParams: {
			pageNum: 2
		},
		columnsDef: [
			{
				cellTemplate: '<span style="color:blue" ng-bind="entity.name" ng-click="app.click()" cc-tooltip="entity.name" tooltip-append-to-body="true"></span>',
				displayName: '姓名',
				align: 'center',
				width: '100px',
				sortProp: 'name'
			},
			{ field: 'age', displayName: '年龄', align: 'center', sortOrder: 'age' },
			{
				field: 'gender',
				displayName: '性别',
				align: 'right',
				width: '100px',
				cellTemplate: '<span>123123123123123123123123123123123123123123123123</span>'
			}
		],
		transformer: {
			pageNum: 'currentPage',
			totals: 'totalCount'
		}
	};

}


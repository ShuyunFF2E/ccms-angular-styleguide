/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-07-20
 */

import userTplUrl from './user-role.html';
import UserRoleCtrl from './UserRoleCtrl';

export default {

	ROLE: {
		url: '/role',
		templateUrl: userTplUrl,
		controller: UserRoleCtrl,
		controllerAs: '$ctrl'
	}

};

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-07-20
 */

import userTplUrl from './user.html';
import UserCtrl from './UserCtrl';

export default {

	USER: {
		url: 'user',
		templateUrl: userTplUrl,
		controller: UserCtrl,
		controllerAs: '$ctrl'
	}
}

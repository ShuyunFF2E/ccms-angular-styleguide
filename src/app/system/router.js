/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-07-20
 */

import systemTplUrl from './system.html';
import SystemCtrl from './SystemCtrl';

export default {

	SYSTEM: {
		url: '/system',
		templateUrl: systemTplUrl,
		controller: SystemCtrl,
		controllerAs: '$ctrl'
	}

};

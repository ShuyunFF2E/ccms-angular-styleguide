/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-01-04
 * 表格控制器,包含一些表格的基本方法跟初始化逻辑
 */

export default class GridCtrl {

	$onInit() {
		this.gridData = this.data.sort((v1, v2) => v1 - v2);
	}

}

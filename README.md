# ccms-angular-styleguide
本规范试用于所有 ccms-angular 体系的web系统

## 目的
借助es6相关语法，实践 MVVM 架构，angular只做view层，M/VM 可以做到脱离框架运行，从而使系统具备可移植性。

## 目录结构
参见当前项目结构

```
+src  
	+app	// 业务模块目录
		+system	// 系统信息模块
			_system.scss	// 模板样式
			index.js		// 模块入口，将 muduleName export 出去, ng 框架壳子在这里定义
			system.html		// 模板html
			SystemCtrl.js	// 用户信息控制器(main)
		-app.html	// 应用 html 模板
		-index.js	// 应用入口
	+assets	// 第三方资源目录(不能通过 npm 管理的包放这里)
		+images
		+css
		+lib
	+common	// 系统通用模块,对业务系统而言,该模块应该实现脱离angular体系的包
		+utils
		-index.js	// 模块入口,也可以没有
	+components	// 业务系统组件目录
		+system-filter-box
			-index.js
			-_system-filter-box.scss
			-system-filter-box.tpl.html
			-SystemFilterBox.js

-package.json
```

## 编码规范
请先确保已经读过 [Angular1.x + ES2015风格指南](https://github.com/kuitos/kuitos.github.io/issues/34)

* module  

  每个module export 出 module name，禁止直接使用字符串声明依赖。
  
  bad
  
  ```js
  export angular.module('app.module1', ['ngResource'])  
  		.name;
  ```
  
  good
  
  ```js
  import ngResource from 'angular-resource';
  
  export angular.module('app.module1', [ngResource])  
  		.name;
  ```
* component / directive
	
	1. 组件使用 angular.component 语法定义
	2. 	非`表单型`组件均采用`单向绑定 + inline-event`。只有`输入/提交`之类交互的`表单型`控件才可采用双向绑定方式。如下：
	
	```js
	import angular from 'angular';
	
	import template from './grid.tpl.html';
	import controller from './GridCtrl';
	
	const ddo = {
		template,
		controller,
		bindings: {
			data: '<',	// 单向绑定
			onRefresh: '&?'	// inline-event
		}
	};
	
	export default angular.module('app.components.grid', [])
		.component('grid', ddo)
		.name;
	```
	usage
	
	```js
	// 业务调用方
	export default class ModuleCtrl {
	
		constrcutor() {
			this.data = [1, 2, 3];
		}
		
		refresh(params) {
			console.log(params);
		}
	}
	```

	```html
	<grid data='$ctrl.data' on-refresh="$ctrl.refresh(params)"></grid>
	```
	
	**constructor vs $onInit**
	
	组件具备`初始化成功`回调钩子`$onInit`，它可以和`constructor`的应用相互辅助使用。
	
	`constructor`用于初始化未绑定的变量，通常是局部状态。`$onInit`方法用于初始化已绑定状态及执行一些初始化逻辑。比如 grid 组件：
	> 已绑定状态指的是定义组件时声明的`bindings`集合
	
	```js
	...
	const ddo = {
		template,
		controller,
		bindings: { // 已绑定状态，在控制器初始化之前就已经生成好了
			data: '<',	// 单向绑定
			onRefresh: '&?'	// inline-event
		}
	};
	...
	```
	
	```js
	export default class GridCtrl {
		
		constructor() {
			this._requested = false;
		}
		
		$onInit() {
			// 手动刷新
			GridHelper.refresh(this.opts);
			this._requested = true;
		}
	}
	
	``` 
* ### No Service/Filter !!
	对业务系统而言，不需要定义`angular service`了，这也意味着我们基本不需要依赖注入，使用es6 module代替。
	
	服务总结来看可以分为三类：
	1. 工具集
	2. 工具方法
	3. 系统级别共享存储单元

	这三类分别用`es6 module`来做可以这样写：

	1. 工具集

		```js
		// Collections.js
		export default {
			
			unique() {
				...
			},
			
			contains() {
				...
			}
			...		
		};
		```
		
		```js
		import Collections from './Collections';
		
		Collections.contains(array, [1, 2]);
		```
	2. 工具方法

		filter作为数据转换的组件，理应是出现在`VM(Controller)`中的，而不是变成一种独特的语法出现在`HTML`中	。按功能分类，`filter`属于工具方法。
		
		```js
		// transformer.js
		export default array => array.map(v => v*2).filter(v => v/2 > 3);
		```
		
		```js
		import transformer from './transformer';
		
		class ModuleCtrl {
			
			$onInit() {
				this.filteredUsers = transformer(this.oldUsers);
			}
		}
		```
	
	3. 共享存储单元
		
		```js
		export const APP_VERSION = '1.0.0';
		export const AUTHOR = 'kuitos';
		```
		
		```js
		import {APP_VERSION, AUTHOR} from './Constant';
		console.log(APP_VERSION, AUTHOR);
		```
* config/router/run

## 使用angular需要规避的点

## 禁止使用！！

## 业务系统需知

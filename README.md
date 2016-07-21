# ccms-angular-styleguide
本规范试用于所有 angular-es6 体系的 ccms web 系统。

## 目的
借助es6相关语法，实践真正的 MVVM 架构，angular只做view层，M/VM 可以做到脱离框架运行，提高系统的可维护性及可移植性。

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
请先确保已经读过 [Angular1.x + ES2015风格指南](https://github.com/kuitos/kuitos.github.io/issues/34)。

基本的js编码规范，遵循统一的[eslint配置](https://github.com/Jocs/ESLint_docs/blob/master/eslintrc.json)

### 命名规范
* class模块，文件名：**首字母大写&驼峰** ，如：

	```js
	// GridCtrl.js
	export default class GridCtrl {}
	```
* 非class模块，文件名：**小写&`-`** 分隔，如：`system-info.html`
* HTML模板
	> 业务模板由路由通过templateUrl的方式引入，而组件模板则会打包到js中，从而做到 按需加载 与 加载性能 之间的平衡

	* 业务模块的 HTML模板 文件名：**xxx.html** 或 **xxx.url.html**， 搭配 templateUrl 使用，即 import 出来的是文件路径，配合 webpack file-loader
	* 组件的 HTML模板 文件名：**xxx.tpl.html**，配合 html-loader，import 出来的为字符串。

	```js
	// systemHTML => '/src/app/system/system-xxxx.html'
	// 根据file-loader配置，xxxx 通常为文件md5指纹
	import systemHTML from './system.html';
	
	$stateProvider.state('sysmte', {
		url: '/system',
		templateUrl: systemHTML
	});
	
	...
	
	// systemTpl => '<div>hello world</div>'
	import systemTpl from './system.tpl.html';
	
	const componentDDO = {
		template: systemTpl
		...
	};
	```
	
### angular配合ES6 编码规范

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

		filter作为数据转换的组件，理应是出现在`VM(Controller)`中的，而不是变成一种独特的语法出现在`HTML`中	。按功能分类，`filter`属于工具方法。(关于为什么不直接使用filter，看这里[why not filter](https://github.com/vuejs/vue/issues/2756#issuecomment-215503966))
		
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
* config/run/router  
	* config/run 配置均属于angular框架包装的部分，这部分代码直接写到入口模块`index.js`中即可。
	* router作为spa系统的通用组件，可以将其配置部分抽离出来：
		
		```js
		import Router from './router';


		function appRouter($stateProvider) {
			$stateProvider.state('app', Router.APP);
		}
		appRouter.$inject = ['$stateProvider'];
		```


## 使用angular需要规避的点
### 宗旨就是把angular只当做视图层框架来用，不要在 VM/M 层中出现angular的影子。

* 代码里不要出现`$scope` [消除angular中的$scope](https://github.com/kuitos/web-development-enlightenment/blob/master/angular/abandon-%24scope.md)
* 消除依赖注入(DI) [消除angular中的DI](https://github.com/kuitos/web-development-enlightenment/blob/master/angular/abandon-dependency-inject.md)
* 不使用angular事件系统，改用：`import EventBus from 'angular-es-utils/event-bus';`
* 不直接调用angular原生api，如 $http、$resource 等。替代方案 [rs-generator](https://github.com/kuitos/angular-es-utils/blob/master/src/rs-generator/README.md)

## 禁止使用！！
以下禁用API均会在portal中锁定，业务系统直接调会抛异常。

1. $rootScope
2. $httpProvider.interceptors 等

## 嵌入后存在的问题及解决方案

1. Controller/Directive/Service/Filter 命名冲突
	
	* Controller: 避免直接使用`angular.controller`语法定义控制器，直接在 路由/指令 控制器参数处传入 Controller 构造函数，而不是 控制器名。
	* Directive: 业务系统自己开发的组件，命名采用`业务系统名-组件名`的格式。
	* Service: 业务系统不应该出现angular service，统一用 ES6 Module 代替。
	* Filter: 同上。

2. 业务系统路由配置的 $state.go 后的二次点击不生效问题
	
	* portal里加入reload配置
		
		```html
		<a ui-sref="ccms.cb" ui-sref-opts="{reload:true}">联合营销</a>
		```
		
	* 配置 $urlRouterProvider
		
		```js
		$urlRouterProvider.when('/cb', '/cb/index');
		```

3. 路由刷新问题
	
	进入某个业务系统的子路由时，刷新页面只会回到入口页。
	
	正在解决中 [ui-router在使用按需加载的同时支持路由查询功能](http://jira.yunat.com/browse/COMPONENTS-49)

4. webpack整合打包 webpackJsonp 问题
	
	各个子系统配置不同的jsonp名称 [webpack jsonpFunction config](https://webpack.github.io/docs/configuration.html#output-jsonpfunction)

4. 重复打包(css)  
	
	在不同的scss中`@import`同一个scss时，会出现重复打包的情况，这是 node-sass 的锅 [once import](https://github.com/sass/sass/issues/139)
	
	真正解决只能等 node-sass 修复，现阶段只能采取`曲线救国`的方式。例如组件库的做法，在build分离出css后，再手动对css做remove duplicate的处理。  
	[OptimizeCssAssetsPlugin](https://github.com/ShuyunFF2E/ccms-components/blob/master/webpack-build.config.js#L49)  
	[禁用css-loader自带的mini功能](https://github.com/ShuyunFF2E/ccms-components/blob/master/webpack-build.config.js#L102)


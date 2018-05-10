define('purchase/layout/index/index', function (require, exports, module) {
	var Layout = require('cabin/layout/layout'),
		menu = require('purchase/modules/menu/menu'),
		header = require('purchase/modules/header/header'); // 这个可优化为cabin.Layout

	return Layout({
		name: 'cabinindex',
		tpl: 'cabin/layout/index/index.tpl',
		widgets: {
			menu: require('purchase/modules/menu/menu'),
			header: require('purchase/modules/header/header')
		}
	});
});

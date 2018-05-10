;
(function () {
	var handle, _fn, CFG, kDom, temps = [],
		cabinMenu,AJAX,cgiMain;

	var opt = {
		menu: []
	}
	CFG = {
		CONTAINER_CLS: 'J_Menu'
	}
	handle = {
		classname: 'purchase-menu',
		jView: null,
		init: function (data) {
			_fn.init();
		}
	}
	_fn = {
		init: function () {
			handle.jView = kDom.get(handle.classname, $('.' + CFG.CONTAINER_CLS));
			handle.jView.kInsert();

			//todo-------------
            //接口拿菜单数据
            AJAX.post(cgiMain.menuTree, {}, function (res) {
                var data = res.data;
                opt.menu = data;
                //菜单插件加载
                handle.jView.find('#J_menuCont').CabinMenu(opt);
            });

		},
	}
	define('purchase/modules/menu/menu', function (require, exports, module) {
		require('purchase/modules/menu/menu.css');
		require('purchase/modules/menu/menu.tpl');
		//组件
		cabinMenu = require('cabin/widgets/menu/menu');

        AJAX = require('purchase/common/data/ajax');
        cgiMain = require('purchase/config/apimix');
		//底层资源
		kDom = kayak.dom;
		module.exports = handle;
	});
})();

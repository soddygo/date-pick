# data-pick

> 封装cabin时间范围插件

## 插件打包
 
 ```node
 npm run build
 ```
 
 ## 编译后的文件修改
 
 路径:dist/datePick.js
 
 引入方式修改:
 
 ```
 define('privilege/common/plugins/datePick', function (require, exports, module) {
        module.exports = t(require('cabin/lib/daterangepicker/moment'), require('cabin/lib/daterangepicker/daterangepicker'))
    })
```

使用方引入:

```javascript
    var DatePick = require('privilege/common/plugins/datePick').default;

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

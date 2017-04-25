/**
 * Created by ycb on 2016/8/3.
 */
var baseModule = angular.module('baseModule', ['ui.router', 'appFilters', 'appServices', 'ngSanitize', 'appDirectives', 'bsTable']);

baseModule.constant("PATH", PATH);
baseModule.value("NAV", NAV);
baseModule.config(['$httpProvider', function ($httpProvider) {
    //启用跨域cookie
    $httpProvider.defaults.withCredentials = true;
}]);

baseModule.run(['$rootScope', 'NAV', 'PATH', function ($rootScope, NAV, PATH) {
    /**
     * 初始化接口路径
     */
    $rootScope.PATH = PATH;
    /**
     * 初始化导航栏
     */
    $rootScope.NAV = NAV;

}]);


/**
 * 配置路由
 * */
baseModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/adminCenter');
    $stateProvider
        /** ---------------------------用户管理-------------------------- **/
        .state('userList', {
            url: '/userList',
            params: {param: null},
            templateUrl: 'tpls/user/userList.html',
            controller: ['$scope', '$state', userListCon]
            //用户列表
        })
        .state('addOrEditUser', {
            url: '/addOrEditUser',
            params: {param: null},
            templateUrl: 'tpls/user/addOrEditUser.html',
            controller: ['$scope', 'sDao', 'PATH', '$http', '$state', '$stateParams', addOrEditUserCon]
            //添加编辑用户
        })

        /** ---------------------------系统设置----------------------------- **/
        .state('test', {
            url: '/test',
            templateUrl: 'tpls/set/test.html',
            controller: ['$scope', '$http', testCon]
            //个人信息
        })
}]);


var app = angular.module('index', ['baseModule']);
app.controller('indexCtrl', ['$scope', '$interval', indexCtrl]);

app.controller('headerCtrl', ['$scope', function ($scope) {
    $scope.header = {
        icon: "img/ic-toux_.png",
        usernameStr: "admin"
    }
}]);



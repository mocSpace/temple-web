function indexCtrl($scope, $interval) {
    //----动态显示时间
    $interval(function () {
        var today;
        today = new Date();
        $scope.nowTimes = getNowLocale(today);
    }, 1000);
    function getNowLocale(objD) {
        var str;
        var yy = objD.getYear();
        if (yy < 1900) yy = yy + 1900;
        var MM = objD.getMonth() + 1;
        if (MM < 10) MM = '0' + MM;
        var dd = objD.getDate();
        if (dd < 10) dd = '0' + dd;
        var hh = objD.getHours();
        if (hh < 10) hh = '0' + hh;
        var mm = objD.getMinutes();
        if (mm < 10) mm = '0' + mm;
        var ss = objD.getSeconds();
        if (ss < 10) ss = '0' + ss;
        var ww = objD.getDay();
        if (ww == 0) ww = "星期日";
        if (ww == 1) ww = "星期一";
        if (ww == 2) ww = "星期二";
        if (ww == 3) ww = "星期三";
        if (ww == 4) ww = "星期四";
        if (ww == 5) ww = "星期五";
        if (ww == 6) ww = "星期六";
        str = yy + "年" + MM + "月" + dd + "日" + hh + ":" + mm + ":" + ss + " " + ww;
        return str;
    }
}

function userListCon($scope, $state) {

    $scope.edit = function (row) {
        $state.go("addOrEditUser", {param: row})
    };

}

function addOrEditUserCon($scope, sDao, PATH, $http, $state, $stateParams) {

    $scope.user = {};
    $scope.user.gender = 0;
    $scope.user.userType = 0;

    $scope.roleAll = [];
    sDao.post(PATH.getRoleAll, {}, function (data) {
        if (!data.success) return;
        if (data.data && data.data.length > 0) {
            $scope.roleAll = data.data;

            for (var k = 0; k < $scope.roleAll.length; k++) {
                $scope.roleAll[k].isCheck = false;
            }

            if ($stateParams.param) {
                $scope.user = $stateParams.param;

                if ($scope.user.roleIds) {
                    var arr = $scope.user.roleIds.split(',');
                    if (arr && arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            for (var i2 = 0; i2 < $scope.roleAll.length; i2++) {
                                if (arr[i] == $scope.roleAll[i2].id) {
                                    $scope.roleAll[i2].isCheck = true;
                                }
                            }
                        }
                    }
                }
            } else {
                $scope.roleAll[3].isCheck = true;
            }

        }
    });


    $scope.submit = function () {
        $scope.user.roleIds = [];
        // console.info($scope.roleAll);
        for (var i = 0; i < $scope.roleAll.length; i++) {
            if ($scope.roleAll[i].isCheck == true) {
                $scope.user.roleIds.push($scope.roleAll[i].id);
            }
        }
        $scope.user.roleIds = $scope.user.roleIds.join(',');

        if (!$scope.user.store) $scope.user.store = [];
        if (!$scope.user.addressModels) $scope.user.addressModels = [];
        if (!$scope.user.userRoleModels) $scope.user.userRoleModels = [];
        if (!$scope.user.roleIds) {
            swal({
                title: "错误!",
                text: "用户类型不能为空！",
                type: "error",
                timer: 1000
            });
            return;
        }

        if ($scope.user.id) {
            $http.post(PATH.userEdit, $scope.user).then(function (success) {
                return;
                $state.go("userList");
            }, function (error) {});
        } else {
            if (!$scope.user.password) {
                swal({
                    title: "错误!",
                    text: "用户密码不能为空！",
                    type: "error",
                    timer: 1000
                });
            } else {
                $http.post(PATH.addUser, $scope.user).then(function (success) {
                    if (!success.data.success) {
                        swal({
                            title: "错误!",
                            text: success.data.eMsg,
                            type: "error",
                            timer: 1000
                        });
                    } else {
                        swal({
                            title: "完成!",
                            text: "添加用户成功！",
                            type: "success",
                            timer: 1000
                        });
                        $state.go("userList");
                    }

                }, function (error) {});
            }
        }
    }
}


function testCon($scope, $http) {
    // $scope.tableData = [];
    $scope.tb = {};
    // $http.get('json/data.json').success(function (data) {
    // $scope.tableData =  data;
    $scope.tb.bsTableControl = {
        options: {
            url: 'json/data.json',
            // rowStyle: function (row, index) {
            //     return { classes: 'none' };
            // },
            cache: false,
            // height: 400,
            striped: true,
            pagination: true,
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageSize: 10,
            pageList: [5, 10],
            search: false,
            showColumns: true,
            showRefresh: true,
            showExport: true,
            minimumCountColumns: 2,
            clickToSelect: false,
            showToggle: true,
            maintainSelected: true,
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                title: 'Item ID',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'name',
                title: 'Item Name',
                align: 'center',
                valign: 'middle',
                sortable: true,
                editable: {
                    type: 'text'
                }
            }]
        }
    };
    // });

}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

//---数组去重
function uniqueArray(array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
            if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
    }
    return r;
}
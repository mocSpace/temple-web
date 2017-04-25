/**
 * Created by tutu-ycb on 2016/8/3.
 */
function JqueryUtil() {

}
JqueryUtil.prototype.post = function (url, data, fn) {
    $.ajax({
        url: url,// 跳转到 action
        data: data,
        type: 'post',
        cache: false,
        dataType: 'json',
        contentType: "application/json",
        xhrFields: {withCredentials: true},
        success: function (data) {
            console.info(data);

            if (data.eCode == 201 && window.location.pathname.indexOf("admin") > 0) {
                window.location.href = "login.html";
            }

            if (!data.success) {
                if (data.eMsg.length > 0) {
                    swal("", data.eMsg, "warning");
                }
            }

            fn(data);
        }, error: function (e) {
            console.error(e)
        }
    });
};
var jUtil = new JqueryUtil();

function CommonBst() {

    this.el = undefined;
    this.url = undefined;
    this.responseHandler = function (data) {
        if (data.eCode == 201 && window.location.pathname.indexOf("admin") > 0) {
            console.info("到登陆！");
            window.location.href = "login.html";
        }
        return data;
    };

    this.ajaxEditUrl = undefined;
    this.escape = true;//字符串转义
    this.ajaxDelUrl = undefined;
    this.toolbar = undefined;
    this.queryParams = function (params) {
        if (!this.toolbar) {
            return params;
        }
        var searchScope = this.toolbar.scope();
        var search = {};
        for (var p in searchScope.search) {
            search[p] = searchScope.search[p];
        }
        params.search = search;
        return params;
    };
    this.columns = undefined;
    this.selectColumns = [];
    this.uniqueId = undefined;
    this.detailView = false;
    // this.onExpandRow = undefined;
    // this.InitSubTable = undefined;
    this.onExpandRow = function (index, row, $detail) {
        commonBst.InitSubTable(index, row, $detail, 0);
    };
    //    commonBst.queryParams = queryParams;
    //初始化子表格(无线循环)
    this.InitSubTable = function (index, row, $detail, level) {
        ++level;
        $detail.css("padding", 0);

        var parentid = row.parentId;
        var detailView = row.child.length > 0;
        var cur_table = $detail.html('<table></table>').find('table');
        $(cur_table).bootstrapTable({
            data: row.child,
            showHeader: false,
//            queryParams: {strParentID: parentid},
//            ajaxOptions: {strParentID: parentid},
            clickToSelect: true,
           // classes:'table-no-bordered ',
            detailView: detailView,//父子表
            uniqueId: "id",
            //            pageSize: 10,
            //            pageList: [10, 25],
            columns: columns,
            //无线循环取子表，直到子表里面没有记录
            onExpandRow: function (index, row, $Subdetail) {
                commonBst.InitSubTable(index, row, $Subdetail, level);
            }
        });
        console.info("row-->" + JSON.stringify(row));
        console.info("row-->" + level);

        $detail.find("table").css("border-width", 0);
        $detail.find("tr").css("border-left-width", 0);
        $detail.find("tr").css("border-right-width", 0);
        $detail.find(".fixed-table-container").css("border-width", 0);
        $detail.find(".detail-icon").css("margin-left", level * 20 + "px");
        $detail.find(".detail-icon").parent().css("text-align", "left");
        $detail.find(".detail-icon").parent().next().css("text-align", "left");
        $detail.find(".detail-icon").parent().next().next().css("padding-left", (level + 1) * 20 + "px");
//        $detail.find(".detail-icon").css("margin-left", parseInt($detail.find(".detail-icon").css("margin-left"));
//         $detail.find(".detail-icon").parent().css("width", "100px");
        $detail.find(".detail-icon").parent().next().css("text-align", "center");
        $detail.find(".bs-checkbox ").css("width", "36px");
        // $detail.find(".bs-checkbox ").css("padding-left", "8px");

    };

    this.editableSave = function () {

    };
    //this.loadSuccess = undefined;
    this.loadSuccess = function (data) {
        console.info("loadSuccess " + data)
    };
    this.loadSuccessHover = function () {

    };
    this.refresh = function () {
        this.el.bootstrapTable("refresh");
    };

    this.eventsDel = function (e, value, row, index) {
        var ajaxDelUrl = this.ajaxDelUrl;
        var uniqueId = this.uniqueId;
        var el = this.el;
        swal({
            title: "删除警告！",
            text: "你确定要删除该数据吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            closeOnConfirm: false
        }, function () {
            // console.warn(value);
            // console.warn(this.uniqueId);
            var data = [row];
            // eval("data." + uniqueId + "=row." + uniqueId);
            jUtil.post(ajaxDelUrl, JSON.stringify(data), function (data) {
                if (!data.success) return;
                // swal("完成!", "用户已经删除！", "success");
                swal({
                    title: "完成!",
                    text: "数据删除成功！",
                    type: "success",
                    timer: 1000
                });

                // el.bootstrapTable('remove', {
                //     field: 'id',
                //     values: [row.id]
                // });
                el.bootstrapTable("refresh")
            });
        });
    };

    this.eventsEdit = function (e, value, row, index, url) {
        alert('You click edit action!');
    };
    this.eventsLink = function (e, value, row, index, url) {
        alert('You click edit action!');
    };


}


function initBST(commonBst) {

    $.fn.editable.defaults.mode = 'inline';// 'popup';
    $.fn.editable.defaults.emptytext = "无内容";
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });

    commonBst.el.bootstrapTable({
        url: commonBst.url,                          //请求后台的URL（*）
        method: 'post',                              //请求方式（*）
        responseHandler: commonBst.responseHandler,
        toolbar: commonBst.toolbar,                  //工具按钮用哪个容器
        escape: commonBst.escape,                     //字符串转义
        striped: true,                               //是否显示行间隔色
        cache: true,                                 //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                           //是否显示分页（*）
        sortable: true,                             //是否启用排序
        sortOrder: "desc",                          //排序方式
        queryParams: commonBst.queryParams,         //传递参数（*）
        sidePagination: 'server',                   //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                              //初始化加载第一页，默认第一页
        pageSize: 10,                               //每页的记录行数（*）
        pageList: [10, 25, 50, 100, 500, 1000],     //可供选择的每页的行数（*）
        search: false,                              //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
//            strictSearch: true,
        showColumns: true,                          //是否显示所有的列
        showRefresh: true,                          //是否显示刷新按钮
        showExport: true,                           //导出
        exportDataType: "basic",                    //basic', 'all', 'selected'
        minimumCountColumns: 2,                     //最少允许的列数
        clickToSelect: true,                        //是否启用点击选中行
//            height: 550,                          //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: commonBst.uniqueId,               //每一行的唯一标识，一般为主键列
        showToggle: false,                          //是否显示详细视图和列表视图的切换按钮
        cardView: false,                            //是否显示详细视图
        detailView: commonBst.detailView,           //是否显示父子表
        columns: commonBst.columns,
        onExpandRow: commonBst.onExpandRow,
        dataField:"list",
        responseHandler:function (res) {
            return res.data;
        }
    });

    var columnsV = commonBst.columns;
    for (var k in columnsV){
        if (columnsV[k].field && columnsV[k].title && columnsV[k].title != "操作") {
            commonBst.selectColumns.push(columnsV[k]);
        }
        if(columnsV[k].field == "id") {
            columnsV[k].title = "id";
            commonBst.selectColumns.push(columnsV[k]);
        }
    }


    commonBst.el.on("editable-save.bs.table", function (e, field, row, oldValue) {
        var data = {};
        eval("data." + commonBst.uniqueId + "=" + "row." + commonBst.uniqueId);
        data.field = field;
        data.oldValue = oldValue;
        data.newValue = eval("row." + field);
        jUtil.post(commonBst.ajaxEditUrl, JSON.stringify(data), function (data) {
            commonBst.refresh();
            console.info(data);
        })
    });
    commonBst.el.on("editable-init.bs.table", function (e, field, row, oldValue) {
    });
    commonBst.el.on("editable-shown.bs.table", function (e, field, row, oldValue) {
    });
    commonBst.el.on("editable-hidden.bs.table", function (e, field, row, oldValue) {
    });
    commonBst.el.on('load-success.bs.table', commonBst.loadSuccess);
    commonBst.el.on('load-error.bs.table', function (status, res) {
        console.error(status)
        console.error(res)
    });

    commonBst.el.on('click-row.bs.table', function (e, row, $element) {
        $($element).siblings().removeClass("info");
        $($element).addClass("info");
    });

    $('#search').click(function () {
        commonBst.el.bootstrapTable("filterBy", function () {
        })
    });

    $('#removeRows').click(function () {
        var arr = [];
        $.map(commonBst.el.bootstrapTable('getSelections'), function (row) {
            var data;
            // eval("data = row." + commonBst.uniqueId);
            // eval("data = row." + commonBst.uniqueId);
            arr.push(row);
        });

        var postData = arr;
        // var postData = {};
        // postData.ids = arr;
        // postData.ids = arr.join(',');
        swal({
            title: "删除警告！",
            text: "你确定要删除选中的数据吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            closeOnConfirm: false
        }, function () {

            jUtil.post(commonBst.ajaxDelUrl, JSON.stringify(postData), function (data) {
                if (!data.success) return;
                // swal("完成!", "用户已经删除！", "success");
                swal({
                    title: "完成!",
                    text: "数据删除成功！",
                    type: "success",
                    timer: 1000
                });

                commonBst.el.bootstrapTable("refresh")
            });
        });



        // commonBst.el.bootstrapTable('remove', {
        //     field: commonBst.uniqueId,
        //     values: uniqueIds
        // });
        // commonBst.eventsDel
    });

    return commonBst.el;
}

// 参数	默认值	描述
// title	null(required)	窗口的名称。可以通过对象的”title”属性或第一个参数进行传递。
// text	null	窗口的描述。可以通过对象的”text”属性或第二个参数进行传递。
// type	null	窗口的类型。SweetAlert 有4种类型的图标动画：”warning”, “error”, “success” 和 “info”.可以将它放在”type”数组或通过第三个参数传递。
// allowOutsideClick	false	如果设置为“true”，用户可以通过点击警告框以外的区域关闭警告框。
// showCancelButton	false	如果设置为“true”，“cancel”按钮将显示，点击可以关闭警告框。
// confirmButtonText	“OK”	该参数用来改变确认按钮上的文字。如果设置为”true”，那么确认按钮将自动将”Confirm”替换为”OK”。
// confirmButtonColor	“#AEDEF4”	该参数用来改变确认按钮的背景颜色（必须是一个HEX值）。
// cancelButtonText	“Cancel”	该参数用来改变取消按钮的文字。
// closeOnConfirm	true	如果希望以后点击了确认按钮后模态窗口仍然保留就设置为”false”。该参数在其他SweetAlert触发确认按钮事件时十分有用。
// imageUrl	null	添加自定义图片到警告框上。必须是图片的完整路径。
// imageSize	“80×80”	当设定图片的路径后，你可以设定图片的大小，格式为两个数字中间带个”x”符号。
// timer	null	警告框自动关闭的时间。单位是ms。


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.stringToDate = function () {
    //= ""
    var v = this;
    var index = v.lastIndexOf(".");
    if (index > 0) {
        v = v.substring(0, index)
    }
    return new Date(Date.parse(v.replace(/-/g, "/")));
    //return new Date(Date.parse(this.replace(/-/g, "/")));
};

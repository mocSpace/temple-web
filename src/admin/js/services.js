var appServices = angular.module('appServices', []);

/**
 * post And get 数据的服务
 */
appServices.service("sDao", sDao);


/**
 *
 * @param $http
 */
function sDao($http, $location) {
    // var data = {"data": null, "success": false, "eCode": 0, "eMsg": "", "time": 1459321374483};

    this.post = function (url, data, fn) {
        //console.info("*-*-*-*-sDao-post");
        $http.post(url, data).then(function (resp) {
            //console.info("*-*-*-*-sDao-success");
            //响应成功时调用，resp是一个响应对象
            var data = resp.data;
            console.info(data);
            if (data.eCode == 201) {
                window.location.href = "login.html";
            }
            fn(data, status, headers, config)
        }, function (resp) {
            // 响应失败时调用，resp带有错误信息
            console.error(resp.data);
            fn(resp.data, resp.status, resp.headers, resp.config);
        });
    };

    this.get = function (url, fn) {
        //console.info("*-*-*-*-sDao-get");
        $http.get(url).then(function (resp) {
            //console.info("*-*-*-*-sDao-success");
            //响应成功时调用，resp是一个响应对象
            var data = resp.data;
            console.info(data);
            if (data.eCode == 201) {
                window.location.href = "login.html";
            }
            fn(data, status, headers, config)
        }, function (resp) {
            // 响应失败时调用，resp带有错误信息
            console.error(resp.data);
            fn(resp.data, resp.status, resp.headers, resp.config);
        });
    };
}














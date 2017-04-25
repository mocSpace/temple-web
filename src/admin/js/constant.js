var HTTP = "localhost:8080/";
var PATH = {

    login: HTTP + "/admin/login.json1see",                       //登录
    logout: HTTP + "/admin/logout.json",
    ueditorServerUrl: HTTP + "/ueditor/upLoad.json", //百度富文本上传服务器路径
    getKaptchaImageB64: HTTP + "/kaptcha/getKaptchaImageB64.json",                      //取验证码图片B64

    getBSTUsers: HTTP + "/admin/getPage.json",                     //用户列表
    getUserByPhoneOrName: HTTP + "/user/getUserByPhoneOrName.json",                     //用户：搜索根据手机号和用户名
    getUserInfo: HTTP + "/user/getUserInfo.json",                     //取当前登陆用户信息
    editUserAjax: HTTP + "/user/editUser.json",                      //编辑用户Ajax
    addUser: HTTP + "/user/userAdd.json",
    userEdit: HTTP + "/user/userEdit.json",
    delectUser: HTTP + "/user/delectUser.json",                      //删除用户
    addOrEditUser: HTTP + "/user/addOrEditUser.json",                        //添加或编辑用户
    getUserByNumber: HTTP + "/user/getUserList.json",                       //根据商铺号取用户
    getUserAll: HTTP + "/user/getUserAll.json",
    getRoleAll: HTTP + "/admin/getRoleAll.json",

    getGoodsCategoryBST: HTTP + "/goods/getGoodsCategoryBST.json",                      //商品分类列表
    getGoodsCategory: HTTP + "/goods/getGoodsCategory.json",
    addGoodsCategory: HTTP + "/goods/addGoodsCategory.json",                 //添加商品分类
    editGoodsCategory: HTTP + "/goods/editGoodsCategory.json",                  //编辑商品分类
    delGoodsCategory: HTTP + "/goods/delGoodsCategory.json",                        //删除商品分类
    ajaxEditGoodsCategory: HTTP + "/goods/ajaxEditGoodsCategory.json",                        //商品分类:ajax修改字段

    getLogsBST: HTTP + "/log/listBST.json",                             //日志记录表
    upLoad: HTTP + "/upLoad/file.json",                     //文件上传
    getExceptionsBST: HTTP + "/exception/listBST.json",                     //异常信息收集表

    addRepair: HTTP + "/repair/addRepair.json",                     //添加维修
    ajaxEditRepair: HTTP + "/repair/ajaxEditRepair.json",                     //物业报修:ajax修改字段
    getRepair: HTTP + "/repair/getRepairBST.json",                      //报修信息
    delectRepair: HTTP + "/repair/delRepair.json",                      //删除报修信息
    getOrderList: HTTP + "/order/getOrderBST.json",                     //订单列表
    editOrderAjax: HTTP + "/order/ajaxEditOrder.json",                      //编辑订单Ajax
    delectOrderAjax: HTTP + "/order/delOrder.json",                     //删除订单
    addOrder: HTTP + "/order/addOrder.json",                        //添加订单
    addOrders: HTTP + "/order/addOrders.json",                        //添加订单
    addOrderByExcel: HTTP + "/order/addOrderByExcel.json",                        //添加订单

    getMessageOutBST: HTTP + "/message/getMessageOutBST.json",                      //消息列表
    addMessageOut: HTTP + "/message/addMessageOut.json",                      //添加消息
    delMessageOut: HTTP + "/message/delMessageOut.json",                        //删除消息
    ajaxEditMessage: HTTP + "/message/ajaxEditMessageOut.json",                     //编辑消息Ajax

    addOrEditLogistics: HTTP + "/logistics/addOrEditLogistics.json",                        //添加或编辑物流
    getBSTLogistics: HTTP + "/logistics/getLogisticsBST.json",                      //物流列表
    delectLogistics: HTTP + "/logistics/delLogistics.json",                         //删除物流
    editLogisticsAjax: HTTP + "/logistics/ajaxEditLogistics.json",                      //编辑物流Ajax

    addStore: HTTP + "/store/addStore.json",                        //添加商铺
    getBSTStore: HTTP + "/store/getStoreBST.json",                      //商铺列表
    delStore: HTTP + "/store/delStore.json",                       //删除商铺
    editStoreAjax: HTTP + "/store/ajaxEditStore.json",                        //编辑商铺Ajax
    editStore: HTTP + "/store/editStore.json",                       //编辑商铺
    storeRegister: HTTP + "/feedback/register.json",                       //编辑商铺

    getArticleBST: HTTP + "/article/getArticleBST.json",                       //文章列表
    delArticle: HTTP + "/article/delArticle.json",                      //文章删除
    editArticle: HTTP + "/article/editArticle.json",                      //文章编辑
    ajaxEditArticle: HTTP + "/article/ajaxEditArticle.json",                       //文章:ajax修改字段
    addArticle: HTTP + "/article/addArticle.json",                       //文章:添加
    getArticleAll: HTTP + "/article/getArticleAll.json",                       //文章:获取首页
    getUserFeedbackBST: HTTP + "/feedback/getUserFeedbackBST.json",
    delUserFeedback: HTTP + "/feedback/delUserFeedback.json",
    ajaxEditUserFeedback: HTTP + "/feedback/ajaxEditUserFeedback.json",
    editUserFeedback: HTTP + "/feedback/editUserFeedback.json",
    addUserFeedback: HTTP + "/feedback/addUserFeedback.json"


};


/**
 * 导航栏对象
 * @constructor
 */
var NAV = function () {
    this.title1 = "";
    this.title2 = "";
    this.titleBtn = "";
    this.href = "";
};































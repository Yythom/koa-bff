export default (router, middleware, controller) => {
    // 注册路由
    router.get('/dcloud/upgrade', controller.dcloud.upgrade);
};

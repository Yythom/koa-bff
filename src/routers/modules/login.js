export default (router, middleware, controller) => {
    // 注册路由
    router.post('/login', controller.login.login);
    router.post('/sku', controller.login.sku);
};

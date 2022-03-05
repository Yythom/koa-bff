export default (router, middleware, controller) => {
    // 注册路由
    router.get('/test', controller.test.test);
};

export default (router, middleware, controller) => {
    // 注册路由
    router.post('/upload', controller.file.upload);
    router.post('/del', controller.file.del);
    router.get('/file', controller.file.get);
};

export default (router, middleware, controller) => {
    // 注册路由
    router.post('/upload', controller.file.upload);
};
export default (router, middleware, controller) => {
    // 注册路由
    router.post('/upload', controller.file.upload);
    router.post('/del', controller.file.del);
    router.get('/file', controller.file.get);

    // 分片
    router.post('/s_upload/:filename/:chunk_name/:start', controller.sfile.s_upload);
    router.get('/verify/:filename', controller.sfile.verify);
    router.get('/merge/:filename/:size', controller.sfile.merge);
};

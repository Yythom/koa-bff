export default (router, middleware, controller) => {
    // 注册路由
    router.post('/qrcode', controller.qrcode.qrcode);
};

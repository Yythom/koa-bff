export default (router, middleware, controller) => {
    // 注册路由
    router.post('/getLocationDetail', controller.map.getLocationDetail);
};

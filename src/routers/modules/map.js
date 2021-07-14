export default (router, middleware, controller) => {
    // 注册路由
    router.post('/getLocationDetail', controller.map.getLocationDetail);
    router.post('/getLocation', controller.map.getLocation);
    router.post('/polyLine', controller.map.polyLine);
    router.post('/locationKeyword', controller.map.locationKeyword);
    router.post('/searchAround', controller.map.searchAround);
};

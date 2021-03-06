/**
 * @desc 生产环境配置
 * @author yyt
 * @date 2020/5/11
 */

module.exports = {
    NODE_ENV: 'production', // 环境名称
    HOST: '', // 主机地址
    PORT: 8702, // 服务端口号
    mongodb_url: '', // 数据库地址
    redis_url: '', // redis地址
    redis_port: '', // redis端口号
    api_url: 'http://', // 中间层对接后端接口的url
};

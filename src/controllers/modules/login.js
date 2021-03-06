import api from '../../api/index';
import { combine } from '../../utils/utils';

module.exports = {
    login: async (ctx, next) => {
        const data = ctx.request.body;
        // const result = await api.login.loginApi(data, ctx);

        // console.log(result, 'result');
        ctx.body = {
            result: {
                ...data,
                list: data.page < 3 ? [1, 2, 3, 4, 5, 6, 7] : [],
            },
            code: 0,
        };
    },
    sku: async (ctx, next) => {
        // const result = await api.login.userInfoApi(ctx);
        const names = ['iphone X', 'iphone XS'];
        const colors = ['黑色', '白色'];
        const storages = ['64g', '256g'];

        ctx.body = combine(names, colors, storages);
    },
};

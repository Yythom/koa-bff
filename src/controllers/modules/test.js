/* eslint-disable no-plusplus */
module.exports = {
    test: async (ctx, next) => {
        const { page, pageSize } = ctx.request.query;
        console.log(page, pageSize);
        const arr = [];
        for (let index = 0; index < pageSize; index++) {
            const element = {
                page: `${page}`,
                index: `${index}`,
            };
            arr.push(element);
        }
        ctx.body = JSON.stringify({
            code: 0,
            data: arr,
        });
    },
};

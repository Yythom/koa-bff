import Axios from 'axios';
import Config from '../../utils/mapConfig';

module.exports = {
    getLocationDetail: async (ctx, next) => {
        const data = ctx.request.body;
        const url = `https://apis.map.qq.com/ws/geocoder/v1/?address=${encodeURIComponent(data.address)}&get_poi=1&poi_options=radius=1000&key=${Config.LOCATION_KEY}`;
        const res = await Axios.get(url);
        if (res.data.status === 0) {
            ctx.body = { code: 0, ...res.data };
        } else {
            ctx.body = { code: false, msg: '地址请求错误' };
        }
    },
    getLocation: async (ctx, next) => {
        const data = ctx.request.body;
        const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${data.lat},${data.lng}&key=${Config.LOCATION_KEY}`;
        const res = await Axios.get(url);
        if (res.data.status === 0) {
            ctx.body = { code: 0, ...res.data };
        } else {
            ctx.body = { code: false, msg: '地址请求错误' };
        }
    },
    polyLine: async (ctx, next) => {
        const data = ctx.request.body;
        const url = `https://apis.map.qq.com/ws/direction/v1/bicycling/?from=${data.from}&to=${data.to}&key=${Config.LOCATION_KEY}`;
        const res = await Axios.get(url);
        if (res.data.status === 0) {
            ctx.body = { code: 0, ...res.data };
        } else {
            ctx.body = { code: false, msg: '地址请求错误' };
        }
    },
    locationKeyword: async (ctx, next) => {
        const data = ctx.request.body;
        const url = `https://apis.map.qq.com/ws/place/v1/suggestion/?keyword=${encodeURIComponent(data.keyword)}&page_index=1&page_size=20&key=${Config.LOCATION_KEY}`;
        const res = await Axios.get(url);
        if (res.data.status === 0) {
            ctx.body = { code: 0, ...res.data };
        } else {
            ctx.body = { code: false, msg: '地址请求错误' };
        }
    },
    searchAround: async (ctx, next) => {
        const data = ctx.request.body;
        const url = `https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(${data.location},${data.distance || 1000})&keyword=${encodeURIComponent(data.keyword)}&page_size=20&page_index=1&key=${Config.LOCATION_KEY}`;
        const res = await Axios.get(url);
        if (res.data.status === 0) {
            ctx.body = { code: 0, ...res.data };
        } else {
            ctx.body = { code: false, msg: '地址请求错误' };
        }
    },


};

import Axios from 'axios';
import api from '../../api/index';
import Config from '../../utils/mapConfig';
import request from '../../utils/request';
import { combine } from '../../utils/utils';

module.exports = {
    getLocationDetail: async (ctx, next) => {
        const data = ctx.request.body;
        const url = `${Config.MAP_SERVER_URL}/ws/geocoder/v1/?address=${encodeURIComponent(data.address)}&get_poi=1&poi_options=radius=1000&key=${Config.LOCATION_KEY}`;
        const res = await Axios.get(url);
        if (res.data.status === 0) {
            ctx.body = { code: 0, ...res.data };
        } else {
            ctx.body = { code: false, msg: '地址请求错误' };
        }
    },

};

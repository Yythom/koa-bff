/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
/* eslint-disable indent */
/* eslint-disable no-restricted-syntax */
const os = require('os');

function combine(...chunks) {
    const res = [];
    const helper = function (chunkIndex, prev) {
        const chunk = chunks[chunkIndex];
        const isLast = chunkIndex === chunks.length - 1;
        let str;
        for (const val of chunk) {
            const cur = prev.concat(val);
            if (isLast) {
                res.push(cur.join(';'));
            } else {
                helper(chunkIndex + 1, cur);
            }
        }
        // console.log(str);
    };
    helper(0, []);
    return res;
}

// 获取ip地址
function getIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const dev in interfaces) {
        const iface = interfaces[dev];
        for (let i = 0; i < iface.length; i++) {
            const { family, address, internal } = iface[i];
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                if (address.indexOf('10.') !== -1) {
                    console.log(address, 'address');
                    return '49.234.41.182';
                }
                return address;
            }
        }
    }
    return '';
}

export {
    combine, // 全排
    getIpAddress,
};

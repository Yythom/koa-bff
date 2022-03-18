/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-cond-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import path from 'path';

const TMP_DIR = path.resolve(__dirname, '../../../public/tmp/');
const http = 'http://';
const PUBLIC_DIR = path.resolve(__dirname, '../../../public/uploads/');
const DEFAULT_SIZE = 80 * 1024 * 1024;

const olds = '1.8.1';
const news = '1.8.3';
class getVersion {
    static splitVersion(oldval, newval, oldCode, reqCode) {
        // 校验是否传入参数
        if (!oldval || !newval) { console.error('[传入参数不完整!]'); return false; }

        // 校验参数是否为string
        if (typeof oldval !== 'string' || typeof newval !== 'string') { console.error('[请传入字符串类型!]'); return false; }

        // 检测字母
        const alpA = this.checkAlphabet(oldval);
        const alpB = this.checkAlphabet(newval);

        // 过滤掉版本字母
        let version = null;
        const visA = oldval.split(/\.|\D/);
        const visB = newval.split(/\.|\D/);

        // 含字母时重组, 格式需固定
        // 不允许出现单个字母形式1.2.1 | 1.2.1a
        if (alpA && alpB) {
            visA[visA.length - 1] = alpA;
            visB[visB.length - 1] = alpB;
        }

        this.replaceArry(visA);
        this.replaceArry(visB);
        this.coverZero(visA, visB);

        version = this.checkVersion(visA, visB, oldval, newval, oldCode, reqCode);
        console.log(version);
        return version;
    }

    // 比较版本
    static checkVersion(visA, visB, oldval, newval, oldCode, reqCode) {
        const obj = {
            isupgrad: false,
            str: `已经最新 : ${oldval} ${oldCode}`,
        };
        for (const i in visA) {
            for (const j in visB) {
                if (i === j) {
                    if (parseInt(visA[i], 10) < parseInt(visB[j], 10)) {
                        obj.isupgrad = true;
                        obj.str = `最新版本 : ${newval} ${reqCode}`;
                    }
                    if (parseInt(visA[i], 10) > parseInt(visB[j], 10)) {
                        obj.isupgrad = true;
                        obj.str = `已经最新 : ${oldval} ${oldCode}`;
                    }
                }
            }
        }
        if (!obj.isupgrad) {
            if (oldCode < reqCode) {
                obj.isupgrad = true;
                obj.str = `最新版本 : ${newval} ${reqCode}`;
            }
        }
        return obj;
    }

    // 替换空元素
    static replaceArry(item) {
        for (const i in item) {
            if (item[i] === '') { item[i] = '0'; }
        }
    }

    // 补全数组长度
    static coverZero(visA, visB) {
        const lenA = visA.length;
        const lenB = visB.length;
        if (lenA === lenB) { return false; }
        const minVal = lenA > lenB ? lenB : lenA;
        const maxVal = lenA > lenB ? lenA : lenB;
        const aryVal = lenA > lenB ? visB : visA;
        for (let i = minVal; i < maxVal; i++) { aryVal.push('0'); }
    }

    // 校验字母
    static checkAlphabet(item) {
        const reg = /^[A-Za-z]+$/;
        const len = item.length - 1;
        const lastNode = item[len];
        if (reg.test(lastNode)) {
            // 转化, 规定默认b > a
            return item.charCodeAt(len).toString();
        }
    }
}
// 调用

export {
    TMP_DIR,
    getVersion,
    http,
    PUBLIC_DIR,
    DEFAULT_SIZE,
};

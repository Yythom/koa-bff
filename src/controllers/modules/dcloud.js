/* eslint-disable no-plusplus */
import Axios from 'axios';
import { Apk } from 'node-apk';
import path from 'path';
import fs, { WriteStream } from 'fs-extra';
import crypto from 'crypto';
import {
    DEFAULT_SIZE, PUBLIC_DIR, TMP_DIR, http, getVersion,
} from '../../utils/file/s_file';
import { getIpAddress } from '../../utils/utils';
import config from '../../config';

module.exports = {
    upgrade: async (ctx, next) => {
        // 'af77e496e920883de939dc1d7c17fb65.apk'
        const { code, version } = ctx.request.query;
        const fileList = await fs.readdir(PUBLIC_DIR);
        let apkHashName = '';
        for (let index = 0; index < fileList.length; index++) {
            const element = fileList[index];
            if (element.indexOf('apk') !== -1) apkHashName = element;
        }
        const filePath = path.join(PUBLIC_DIR, apkHashName); // 合并后的文件写入的位置
        const DownloadUrl = `${`${http}${getIpAddress()}:${config.PORT}`}/file?url=${encodeURIComponent(apkHashName)}`;
        const is = fs.existsSync(filePath);
        if (is) {
            const apk = new Apk(filePath);
            const appInfo = await apk.getManifestInfo();
            const { size } = fs.statSync(filePath);
            const buffer = fs.readFileSync(filePath);
            const hash = crypto.createHash('md5');
            hash.update(buffer, 'utf8');
            const md5 = hash.digest('hex');
            const initJson = {
                Code: 0,
                Msg: '',
                UpdateStatus: 0,
                VersionCode: appInfo.versionCode,
                VersionName: appInfo.versionName,
                UploadTime: ' ',
                ModifyContent: '',
                DownloadUrl: '',
                ApkSize: (size / 1024),
                ApkMd5: md5,
            };
            const check = getVersion.splitVersion(`${version}`, appInfo.versionName, code, appInfo.versionCode);
            if (check.isupgrad) {
                initJson.ModifyContent = '\r\n1、您当前的App版本过低，为了给您提供更好的体验，请将您的App更新至最新版本';
                initJson.UpdateStatus = 1;
                initJson.DownloadUrl = DownloadUrl;
            }
            apk.close();
            ctx.body = initJson;
        } else {
            ctx.body = 'apk未找到';
        }
    },
};

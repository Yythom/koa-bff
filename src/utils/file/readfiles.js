/* eslint-disable no-plusplus */
const fs = require('fs');
const remove = require('./remove');

async function readDir(pathUrl, contents, matchReg = new RegExp(/<path[^>]*>(?:.|[\r\n])*?<\/path>/g)) {
    return new Promise((resolve, reject) => {
        fs.readdir(pathUrl, (err, fileName) => {
            if (err) {
                resolve('err');
                return;
            }
            for (let i = 0; i < fileName.length; i++) {
                console.log(`${pathUrl}：`, fileName, '\n'); // 所以文件及文件夹
                if (fs.statSync(`${pathUrl}/${fileName[i]}`).isFile() === true) {
                    fs.readFile(`${pathUrl}/${fileName[i]}`, (err, content) => {
                        if (err) {
                            console.log('读取文件内容失败', err);
                        } else {
                            const fileContent = content.toString().match(matchReg).join(`
`);
                            const filePath = `${pathUrl}/${fileName[i]}`;
                            const componentName = fileName[i].split('.')[0].replaceAll(' ', '');
                            contents.push(`
/* ${filePath} */
export const ${componentName} = memo(() => {
     return (
          <div className='icon'>
               ${fileContent}
          </div>
     )
})
                               `);
                            if (fileName.length === contents.length) {
                                contents[0] = `import React,{memo} from "react"
                                                     ${contents[0]}
                                    `;
                                resolve(contents);
                            }
                        }
                    });
                } else {
                    readDir(`${pathUrl}/${fileName[i]}`, contents);
                }
            }
        });
    });
}
function writeFile(filePath, contents) {
    for (let i = 0; i < contents.length; i++) {
        fs.appendFileSync(filePath, contents[i]);
    }
}
const ReadsToWrite = async (pathUrl) => {
    const writePath = `${pathUrl}/index.jsx`;
    remove(writePath, async () => {
        const contents = [];
        const ret = await readDir(pathUrl, contents);
        writeFile(writePath, ret);
    });
};

ReadsToWrite('./src/icons');

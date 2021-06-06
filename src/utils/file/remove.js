import fs from 'fs';
import path from 'path';

function remove(tarPath, cb) {
    fs.stat(tarPath, (err, states) => {
        if (err) {
            cb();
            return;
        }
        if (states.isDirectory()) {
            fs.readdir(tarPath, (err, files) => {
                if (err) {
                    console.log('ok2');
                    cb();
                    return;
                }
                files.forEach((file) => {
                    remove(path.join(tarPath, file), cb);
                });
            });
        } else {
            fs.unlink(tarPath, (err) => {
                if (err) {
                    console.log(err);
                }
                cb();
            });
        }
    });
}

export default remove;

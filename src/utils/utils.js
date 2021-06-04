/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
/* eslint-disable indent */
/* eslint-disable no-restricted-syntax */
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
        console.log(str);
    };
    helper(0, []);
    return res;
}

export {
    combine, // 全排
};

#!/usr/bin/env node

import fs from "fs";
import util from "util";
import chalk from "chalk";
import path from "path";

// const lstat = util.promisify(fs.lstat);

const lstat = fs.promises.lstat;

const targetDir = process.argv[2] || process.cwd();

console.log(process.argv);

fs.readdir(targetDir, async (err, filenames) => {
    if(err){
        console.log(err);
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for(let stats of allStats) {
        const index = allStats.indexOf(stats);

        if(stats.isFile()){
            console.log(filenames[index]);
        } else {
            console.log(chalk.bold(filenames[index]));
        }
    }
});

// const lstat = filename => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if(err){
//                 reject(err);
//             }

//             resolve(stats);
//         });
//     });
// };
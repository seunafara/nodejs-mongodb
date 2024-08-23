"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileNamesAndPaths = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getFileNamesAndPaths = (folder) => {
    try {
        let fileNamesAndPaths = [];
        let files = fs_1.default.readdirSync(folder);
        if (files.length) {
            files.forEach((file) => {
                let filePath = path_1.default.join(folder, file);
                let stat = fs_1.default.lstatSync(filePath);
                if (stat.isDirectory()) {
                    let subFiles = (0, exports.getFileNamesAndPaths)(filePath);
                    fileNamesAndPaths = fileNamesAndPaths.concat(subFiles);
                }
                else {
                    fileNamesAndPaths.push({ name: file, path: filePath });
                }
            });
        }
        return fileNamesAndPaths;
    }
    catch (error) {
        console.log("Error ", error);
        return [];
    }
};
exports.getFileNamesAndPaths = getFileNamesAndPaths;
//# sourceMappingURL=index.js.map
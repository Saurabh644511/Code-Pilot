import path from "path";
import fs from "fs";
import { customError, success } from "../../utils/response.util.js";

const currentDir = path.resolve() + "/src" + "/assets";

export const createFile = async (req, res) => {
    const {fileName, content} = req.body;
    fs.writeFile(`${currentDir}/${fileName}`, content, (err) => {
        if(err) {
            return customError(res, {}, 500, err.message || "Error creating file");
        }
        return success (res, {message: "File created successfully"})
    })
}

export const readFile = async (req, res) => {
    const {fileName} = req.params;
    fs.readFile(`${currentDir}/${fileName}`, "utf-8", (err, data) => {
        if(err) {
            return customError(res, {}, 500, err.message || "Error reading file");
        }
        return success(res, {data});
    })
}

export const getFiles = async (req, res) => {
    fs.readdir(currentDir, (err, files) => {
        if(err) {
            return customError(res, {}, 500, err.message || "Error in reading files");
        }
        return success (res, {files});
    })
}

export const updateFile = async (req, res) => {
    const {fileName, content} = req.body;
    fs.writeFile(`${currentDir}/${fileName}`, content, (err) => {
        if(err) {
            return customError(res, {}, 500, err.message || "Error updating file");
        }
        return success(res, {message: "File updated successfully"})
    })
}

export const deleteFile = async (req, res)=> {
    const {fileName} = req.params;
    fs.unlink(`${currentDir}/${fileName}`, (err) => {
        if(err) {
            return customError(res, {}, 500, err.message || "Error in file deleting")
        }
        return success(res, {message: "File deleted successfully"})
    })
};
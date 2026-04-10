import path from "path";
import fs from "fs";
import { customError, success } from "../../utils/response.util.js";

const currentDir = path.resolve() + "/src" + "/assets";

export const createFolder = async (req, res) => {
  const { folderName } = req.body;

  fs.mkdir(`${currentDir}/${folderName}`, {}, (err) => {
    if (err) {
      return customError(
        res,
        {},
        500,
        err.message || "Error in folder creating",
      );
    }
    return success(res, { message: "Folder created successfully" });
  });
};

export const readFolder = async (req, res) => {
  const { folderName } = req.params;
  fs.readdir(`${currentDir}/${folderName}`, "utf-8", (err, data) => {
    if (err) {
      return customError(
        res,
        {},
        500,
        err.message || "Error in reading folder",
      );
    }
    return success(res, { data });
  });
};

export const updateFolder = async(req, res) => {
    const {folderName, newFolderName} = req.body;
    fs.rename(`${currentDir}/${folderName}`, `${currentDir}/${newFolderName}`, (err) => {
        if(err) {
            return customError(res, {}, 500, err.message || "Error in updating folder")
        }
        return success(res, {message: "Folder updated successfully"})
    })
}

export const deleteFolder = async(req, res) => {
    const {folderName} = req.params;
    fs.rm(`${currentDir}/${folderName}`, {recursive: true, force:true}, (err) => {
        if(err) {
            return customError(res, {}, 500, err.message || "Error in folder deleting")
        }
        return success(res, {message: "folder deleted successfully"})
    } )
}
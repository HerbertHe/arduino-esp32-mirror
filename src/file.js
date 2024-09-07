import fs from "fs"
import path from "path"

const dist_path = path.resolve("dist")

/**
 * 写入文件
 * @param {string} name
 * @param {string} content
 */
export const writeFile = (name, content) => {
  if (!fs.existsSync(dist_path)) {
    fs.mkdirSync(dist_path)
  }

  fs.writeFileSync(path.join(dist_path, name), content, { encoding: "utf-8" })
}

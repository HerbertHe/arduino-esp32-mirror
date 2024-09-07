import { writeFile } from "./file.js"
import { fetchRawContent, replaceUrlToMirror } from "./fetch.js"

const main = async () => {
  const raw = await fetchRawContent()
  const replaced = raw.map((c) => ({
    name: c.name,
    content: replaceUrlToMirror(c.content),
  }))
  replaced.forEach((c) => writeFile(c.name, c.content))
}

main()

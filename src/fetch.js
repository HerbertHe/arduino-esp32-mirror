import { urls } from "./constants.js"

/**
 * 获取原始内容
 * @returns
 */
export const fetchRawContent = async () => {
  return await Promise.all(
    urls.map(async ({ url, name }) => {
      const response = await fetch(url)
      const content = await response.text()
      return { name, content }
    })
  )
}

/**
 * 替换原始内容中的url为镜像url
 * @param {string} content
 */
export const replaceUrlToMirror = (content) => {
  const parsed = JSON.parse(content)
  const { platforms, tools } = parsed.packages[0]
  const platforms_mirrored = platforms.map((platform) => ({
    ...platform,
    url: /github\.com\/[^\/]+\/[^\/]+\/releases\//.test(platform.url)
      ? `https://ghproxy.net/${platform.url}`
      : platform.url,
  }))

  const tools_mirrored = tools.map((tool) => ({
    ...tool,
    systems: tool.systems.map((system) => ({
      ...system,
      url: /github\.com\/[^\/]+\/[^\/]+\/releases\//.test(system.url)
        ? `https://ghproxy.net/${system.url}`
        : system.url,
    })),
  }))

  return JSON.stringify(
    {
      packages: [
        {
          ...parsed.packages[0],
          platforms: platforms_mirrored,
          tools: tools_mirrored,
        },
      ],
    },
    null,
    2
  )
}

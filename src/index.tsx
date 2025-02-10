import { Context, Schema } from 'koishi'
import fs from "fs"
import path, { join, resolve } from "path"
import { getRandom } from './util'

export const name = 'where-to-eat'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

const paths = ["../public/edu-mega-center"]

const timePrefixes = [
  '早上', '上午', '中午', '下午', '傍晚', '晚上', '夜宵', '宵夜', '早饭', '早餐', '午饭', '午餐', '晚饭', '晚餐'
];

const timePrefixRegex = new RegExp(`^(${timePrefixes.join('|')})?去哪吃$`);

export function apply(ctx: Context) {
  // write your plugin here

  ctx.on("message", async (session) => {
    const { content = '' } = session
    const trimmedContent = content.trim();

    if (timePrefixRegex.test(trimmedContent)) {
      // 支持下正则：午饭、晚饭等等
      const dir = paths[Math.floor(Math.random() * paths.length)]
      const parentPath = path.join(__dirname, dir)
      const images = fs.readdirSync(parentPath)
      const imagePath = path.join(parentPath, getRandom(images))
      console.log(`[去哪吃][${session.username}]${imagePath}`)
      session.send(<img src={imagePath} />)
    }
  })
}

import { Context, Schema } from 'koishi'
import fs from "fs"
import path, { join, resolve } from "path"
import { getRandom } from './util'

export const name = 'where-to-eat'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

const paths = ["../public/edu-mega-center"]




export function apply(ctx: Context) {
  // write your plugin here

  ctx.on("message", async (session) => {
    const { content = '' } = session
    if (content.trim() === "去哪吃") {
      const dir = paths[Math.floor(Math.random() * paths.length)]
      const parentPath = path.join(__dirname, dir)
      const images = fs.readdirSync(parentPath)
      const imagePath = path.join(parentPath, getRandom(images))
      console.log(`[去哪吃][${session.username}]${imagePath}`)
      session.send(<img src={imagePath} />)
    }
  })
}

import { GluegunToolbox } from 'gluegun'
import {  TARGET } from '../contants'

module.exports = {
  name: 'scrape',
  alias: ['s'],
  description: 'Runs the webscraper',
  run: async (toolbox: GluegunToolbox) => {
    // retrieve the tools from the toolbox that we will need
    const { scrape } = toolbox


        await scrape(TARGET)


  }
}

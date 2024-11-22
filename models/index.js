import fs from 'fs'
import path from 'path'
import {Sequelize} from 'sequelize'
import sequelize from '../utilities/sequelize.js'
const db = {
  Sequelize,
  sequelize
}
for (const file of fs.readdirSync(new URL(
  '.',
  import.meta.url
)).filter(fileName => (
  fileName.indexOf('.') !== 0 &&
  fileName !== path.basename(import.meta.url) &&
  fileName.slice(-8) === 'Model.js' &&
  fileName.indexOf('.test') === -1
))) {
  const model = await import(path.join(
    new URL(
      '.',
      import.meta.url
    ).toString(),
    file
  ))
  db[model.default.name] = model.default
}
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
}
export default db
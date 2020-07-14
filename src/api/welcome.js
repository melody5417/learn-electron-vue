import DB from 'db/index'

const db = DB.sharedInstance()

/**
 * 获取推荐列表
 *
 * @param {*} req
 */
function getWelcomeList (req) {
  console.log('getWelcomeList', JSON.stringify(req))
  return getWelcomeListLocal(req)
}

/**
 * 从数据库读取缓存推荐列表
 *
 * @param {Object} req
 * @param {uint} req.pageNum 第几页
 * @param {uint} req.pageSize 每页个数
 */
function getWelcomeListLocal (req) {
  console.log('getWelcomeListLocal', JSON.stringify(req))
  let condition = ``
  let sql = 'select * from welcome where 1=1 ' + condition + ' order by createdAt limit ? offset ?'
  let sqlInput = [req.pageSize, (req.pageNum - 1) * req.pageSize]
  console.log('getWelcomeListLocal', sql, JSON.stringify(sqlInput))
  return db.all(sql, sqlInput)
}

export {
  getWelcomeList
}

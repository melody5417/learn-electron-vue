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
async function getWelcomeListLocal (req) {
  console.log('getWelcomeListLocal', JSON.stringify(req))
  let condition = ``
  let sql = 'select * from welcome where 1=1 ' + condition + ' order by createdAt limit ? offset ?'
  let sqlInput = [req.pageSize, (req.pageNum - 1) * req.pageSize]
  console.log('getWelcomeListLocal', sql, JSON.stringify(sqlInput))
  const results = await db.all(sql, sqlInput)
  return Promise.all(
    results.map(async item => {
      item.category = await db.get('select * from category where id = ?', [item.category])
      const tags = item.tags.split(',').map(item => { return ('"' + item + '"') }).join(',')
      item.tags = await db.all('select * from tag where id in (' + tags + ')', [])
      item.user = await db.get('select * from user where id = ?', [item.user])
      return item
    })
  )
}

export {
  getWelcomeList
}

import DB from 'db/index'
import Common from 'src/util/common'

const db = DB.sharedInstance()

/**
 * 获取推荐列表
 *
 * @param {*} req
 */
function getWelcomeList (req) {
  console.log('getWelcomeList', JSON.stringify(req))
  return getWelcomeListLocal_(req)
}

/**
 * 从数据库读取缓存推荐列表
 *
 * @param {Object}  req
 * @param {String}  req.title       文章标题，根据文章标题模糊查询
 * @param {uint}    req.pageNum     分页参数 页数
 * @param {uint}    req.pageSize    分页参数 每页显示条数
 */
async function getWelcomeListLocal_ (req) {
  console.log('getWelcomeListLocal', JSON.stringify(req))

  if (!req || !Common.isNumber(req.pageNum) ||
  !Common.isNumber(req.pageSize)) {
    return {
      errCode: -1,
      errMsg: '参数缺失或格式不正确'
    }
  }

  const pageNum = req.pageNum
  const pageSize = req.pageSize
  const start = pageSize * (pageNum - 1)
  let condition = ``
  const condArr = []

  if (req.title) {
    condition += ' and title like ?'
    condArr.push('%' + req.title + '%')
  }
  condition += ` order by createdAt limit ${pageSize} offset ${start}`

  let sql = `select * from welcome where 1=1 ${condition}`
  console.log('getWelcomeListLocal', sql, JSON.stringify(condArr))
  const results = await db.all(sql, condArr)
  return Promise.all(
    results.map(async item => {
      const categoryPromise = db.get('select * from category where id = ?', [item.category])
      const tags = item.tags.split(',').map(item => { return ('"' + item + '"') }).join(',')
      const tagPromise = await db.all('select * from tag where id in (' + tags + ')', [])
      const userPromise = await db.get('select * from user where id = ?', [item.user])
      Promise.all([categoryPromise, tagPromise, userPromise]).then(values => {
        item.category = values[0]
        item.tags = values[1]
        item.user = values[2]
      })
      return item
    })
  )
}

/**
 * 从数据库中删除一条welcome记录
 *
 * @param {Object} req
 * @param {String} req.id 记录id
 */
function deleteWelcome (req) {
  console.log('deleteWelcome', JSON.stringify(req))
  let sql = `delete from welcome where id = '${req.id}'`
  return db.exec(sql)
}

export {
  getWelcomeList,
  deleteWelcome
}

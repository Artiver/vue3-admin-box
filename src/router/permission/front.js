/**
 * 前端路由管理
 **/

/** 引入需要权限的Modules */
import Service from '../modules/service'

/** 登录后需要动态加入的本地路由 */
const FrontRoutes = [
  ...Service,
]

export default FrontRoutes
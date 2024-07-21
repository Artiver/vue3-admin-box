/** 引入路由相关的资源 */
import router, {modules} from './index'
/** 引入vuex实例 */
import store from '@/store'
/** 引入纯前端路由 */
import FrontRoutes from './permission/front'

/**
 * @name 动态路由的权限新增，供登录后调用
 * @other 如果需要进行后端接口控制菜单的话，请在此拿到后端的菜单树与asyncRoutes对比，生成一个新的值
 */
async function addRoutes() {
  return new Promise((resolve) => {
    FrontRoutes.forEach(item => {
      modules.push(item)
      router.addRoute(item)
    })
    resolve()
  })
}

/**
 * @des 登录了之后会执行这个方法，实现动态路由的功能
 */
export async function getAuthRoutes() {
  // 判断token是否存在，存在则调用添加路由的方法
  if (store.state.user.token) {
    await addRoutes()
  }
}

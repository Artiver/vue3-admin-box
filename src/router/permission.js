/** 引入路由相关的资源 */
import router, {modules} from './index'
/** 引入纯前端路由 */
import FrontRoutes from './permission/front'

async function addRoutes() {
    return new Promise((resolve) => {
        FrontRoutes.forEach(item => {
            modules.push(item)
            router.addRoute(item)
        })
        resolve()
    })
}

export async function getAuthRoutes() {
    await addRoutes()
}

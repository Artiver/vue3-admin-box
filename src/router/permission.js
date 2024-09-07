import router, {modules} from "./index";
import FrontRoutes from "./permission/front";

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

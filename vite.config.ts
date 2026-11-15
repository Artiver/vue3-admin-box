import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {fileURLToPath, URL} from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

/**
 * @description-cn vite官网
 * https://vitejs.cn/config/ */
export default defineConfig(() => {
  return {
    base: "./",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      port: 3001,
      host: "0.0.0.0",
      open: false
    },
    build: {
      rollupOptions: {
        output: {}
      }
    },
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          // IconsResolver({
          //     prefix: "Icon",
          // })
        ],
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          // IconsResolver({
          //     enabledCollections: ["ep"],
          // }),
        ],
      }),
      // Icons({
      //     autoInstall: true,
      // }),
    ],
    css: {
      preprocessorOptions: {
        scss: {}
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule: { name: string; remove: () => void }) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ],
      },
    }
  };
});

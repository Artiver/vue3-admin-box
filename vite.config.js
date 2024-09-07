import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {vitePluginSvg} from "@webxrd/vite-plugin-svg";
import {resolve} from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const alias = {
  "@": pathResolve("src")
};

/**
 * @description-cn vite官网
 * https://vitejs.cn/config/ */
export default defineConfig(({command, mode}) => {
  return {
    base: "./",
    resolve: {
      alias
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
      vitePluginSvg({
        // 必要的 必须是绝对路径组成的数组
        iconDirs: [
          resolve(__dirname, "src/assets/svg"),
        ],
        // 必要的 入口script
        main: resolve(__dirname, "src/main.js"),
        symbolIdFormat: "icon-[name]"
      }),
    ],
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
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

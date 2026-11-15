import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"]},
    {languageOptions: {globals: globals.browser}},
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        // .vue 文件由 vue-eslint-parser 解析模板，<script lang="ts"> 交给 typescript-eslint 解析
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: [".vue"],
            },
        },
        rules: {
            // 允许单文件组件使用单词名
            "vue/multi-word-component-names": "off",
        },
    },
    {
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrors: "none",
            }],
        },
    },
    {
        files: ["**/*.d.ts"],
        rules: {
            // 类型声明文件中允许使用 any
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
    {
        ignores: ["dist/**", "node_modules/**", "public/**"],
    },
);

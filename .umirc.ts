import { defineConfig } from 'dumi';
export default defineConfig({
  title: 'Melon',
  mode: 'site',
  history: {
    type: 'hash',
  },
  publicPath:'./',
  hash: true,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/LiuJinYang9527/dumi-blog',
    },
  ],
  favicon: '/favicon.ico',
  logo:"/melon.png",
  // menus: {
  //   '/article': [
  //     {
  //       title: 'JavaScript',
  //       children: [
  //         'article/js/dataType',
  //         'article/js/prototype-chain',
  //         'article/js/closure',
  //         'article/js/inherit',
  //         'article/js/event-loop',
  //         'article/js/practice',
  //         'article/js/algorithms',
  //         'article/js/function',
  //         'article/js/mode',
  //         'article/js/regexp',
  //       ],
  //     },
  //     {
  //       title: 'Vue相关',
  //       children: [
  //         'article/Vue/sourcecode',
  //         'article/Vue/element',
  //         'article/Vue/vuex',
  //         'article/Vue/vueRouter',
  //       ],
  //     },
  //     {
  //       title: 'React相关',
  //       children: [
  //         'article/React/component',
  //         'article/React/antd',
  //         'article/React/reactHooks',
  //         'article/React/react-redux',
  //         'article/React/react-router',
  //       ],
  //     },
  //     {
  //       title: 'Note相关',
  //       children: ['article/Node/index'],
  //     },
  //     {
  //       title: 'TypeScript',
  //       children: ['article/TypeScript/index'],
  //     },
  //     {
  //       title: '持续集成',
  //       children: ['article/CI-CD/index'],
  //     },
  //     {
  //       title:'服务器相关',
  //       children: ['article/Server/index'],
  //     }
  //   ],
  // },
  // more config: https://d.umijs.org/config
});

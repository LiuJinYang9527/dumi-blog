import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Melon的博客',
  mode: 'site',
  history: {
    type: 'hash',
  },
  hash: true,
  navs: [null],
  // more config: https://d.umijs.org/config
});

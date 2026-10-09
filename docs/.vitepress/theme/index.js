import DefaultTheme from 'vitepress/theme';
import DownloadOptions from './components/DownloadOptions.vue';

// The default VitePress theme plus the components used in the docs pages.
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DownloadOptions', DownloadOptions);
  },
};

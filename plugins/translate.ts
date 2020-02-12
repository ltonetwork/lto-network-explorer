import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '../locales/en';
import nl from '../locales/nl';

// register i18n module
Vue.use(VueI18n);

const i18n = new VueI18n({
   locale: 'en',
   fallbackLocale: 'en',
   messages: { en, nl },
   silentTranslationWarn: true
})

const translate = (key: string): string => {
  if (!key) {
    return '';
  }
  // see https://github.com/kazupon/vue-i18n/issues/410
  return i18n.t(key) as string;
};

export { i18n, translate }; //export above method

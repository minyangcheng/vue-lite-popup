import Popup from './Popup.vue';

const iview = {
  Popup,
}
const install = function (Vue, opts = {}) {

  Object.keys(iview).forEach((key) => {
    Vue.component(key, iview[key]);
  });

  Vue.prototype.$Test = function () {
    console.log('this is Test example');
  }

};

//auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(iview, {install});

import Vue from 'vue';
import Router from 'vue-router';

//import App from '@/App';
import Templatelist from '@/components/Templatelist';
import DmGTemplate from '@/component/DmgTemplate';
import CKEditor from 'ckeditor4-vue';
//import Rechnungen from '@/navigation/Rechnungen';
//import Profil from '@/navigation/Profil';
//  {path: '/', redirect: "/templatelist"},
Vue.use(Router);
Vue.use(CKEditor);
export default new Router({
  base: '/',
  mode: 'history',
  routes: [
    {path: '/dmgTemplate', component: DmGTemplate },
    {path: '/templatelist', component: Templatelist },
    {
      path: '/home',
      component: {
        template: "<div>home</div>"
      }
    },
    {
      path: '/about',
      component: {
        template: "<div>about</div>"
      }
    }
  ]
});

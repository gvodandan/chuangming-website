import Vue from 'vue';
import Router from 'vue-router';

import home from '@/components/home/home';
import me from '@/components/me/me';
import about from '@/components/about/about';
import members from '@/components/about/members';
import projects from '@/components/projects/projects';
import news from '@/components/news/news';
import contact from '@/components/contact/contact';
import login from '@/components/login/login';

Vue.use(Router);

const VueRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: home,
      meta: {keepAlive: true}
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/members',
      name: 'members',
      component: members
    },
    {
      path: '/projects',
      name: 'projects',
      component: projects
    },
    {
      path: '/news',
      name: 'news',
      component: news,
      meta: {keepAlive: true}
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: {keepAlive: true}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/me',
      name: 'me',
      component: me,
      alias: '/user'
    }
  ]
});

export default VueRouter

import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home';
import Search from './Search';
import MovieDetail from './MovieDetail';
import NotFound from './NotFound';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return {
      top: 0,
    };
  },
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/search', name: 'search', component: Search },
    { path: '/movie/:id', name: 'movie', component: MovieDetail },
    { path: '/:notfound(.*)', component: NotFound },
  ],
});

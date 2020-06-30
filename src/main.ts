import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faPlusSquare,
	faEdit,
	faSave,
	faTrash,
	faListUl,
	faStream,
	faCheck,
	faPlus,
    faGreaterThan,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import '@/styles/index.scss';

library.add(
	faPlusSquare,
	faEdit,
	faSave,
	faTrash,
	faListUl,
	faStream,
	faCheck,
	faPlus,
    faGreaterThan,
    faSpinner
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');


// JS Dependencies: Bootstrap & JQuery
import 'bootstrap';
import '../../lib/fontawesome/index.js'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
window.jquery = $;

import moment from 'moment';
window.moment = moment;

/*import './_ValidationScriptsPartial'*/

// CSS Dependencies: Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Custom CSS imports
import '../../css/site.css';
import router from '../router'
router.init();
console.log('The \'_Layout\' bundle has been loaded! bootstrap, jquery, site.css - loaded');


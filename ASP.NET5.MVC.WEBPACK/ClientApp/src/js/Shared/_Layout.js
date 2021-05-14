// JS Dependencies: Bootstrap & JQuery
import 'bootstrap';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
window.jquery = $;

/*import './_ValidationScriptsPartial'*/

// CSS Dependencies: Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Custom JS imports
// ... none at the moment

// Custom CSS imports
import '../../css/site.css';
import router from '../router'
router.init();
console.log('The \'_Layout\' bundle has been loaded! bootstrap, jquery, site.css - loaded');


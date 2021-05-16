

/*
 * importing the style in this way will connect the style automatically, without adding '<link ...' to the view
 * import ('datatables.net-bs/css/dataTables.bootstrap.css'); 
 * */
//creating a bundle for dependent styles, which will then need to be included in the view
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs';
//when add the file dynamically from 'router.js' this entry is not needed, it will work without it
//uncomment if you want to manually include the file in view
//window.$.fn.DataTable = dt_bs;

console.log('Adding chunk via routing. The \'Home DataTables\'  chunk has been loaded!');
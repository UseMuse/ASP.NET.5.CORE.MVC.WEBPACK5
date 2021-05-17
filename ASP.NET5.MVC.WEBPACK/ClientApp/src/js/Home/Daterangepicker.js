//import { default as inputmask } from "inputmask";
//window.$.fn.inputmask = inputmask;

const inputmask = require("inputmask/dist/inputmask/jquery.inputmask");
require("inputmask/dist/inputmask/bindings/inputmask.binding");
require("inputmask/dist/inputmask/inputmask.date.extensions");
require("inputmask/css/inputmask.css");
window.$.fn.inputmask = inputmask;

require('daterangepicker/daterangepicker.js');
require('daterangepicker/daterangepicker.css');
console.log('Add js bundle manually in view. The \'Home DataTables\' bundle has been loaded!');
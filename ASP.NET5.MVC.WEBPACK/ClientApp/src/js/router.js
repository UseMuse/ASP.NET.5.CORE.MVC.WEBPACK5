console.log('The \'router\' bundle has been loaded!');
var routes = {
    Home: {
        init: function () {
            window.homePage = { field1: '1', field2: '2' };
            console.log('Route Home init, create windows.homePage', window.homePage);
        },
        Index: function () {
            console.log('Route Home Index, start dynamic import ./HomeDemoChunks/Index.js');
            import(
                /* webpackChunkName: "homePage" */
                "./HomeDemoChunks/Index.js").then((module) => {
                    console.log('Route Index, finish dynamic import module has been loaded', module);
                    window.homePage = { ...window.homePage, ...module.obj }
                    console.log('Route Index, merge data from module with window.homePage', module);
                });
        },
        DataTables: function () {
            console.log('Route Home DataTables, start dynamic import ./Home/DataTables.js');
            import(
                /* webpackChunkName: "homePage" */
                "./Home/DataTables.js").then((module) => {
                    console.log('Route DataTables, finish dynamic import module has been loaded', module);
                });
        },
        Privacy: function () {
            console.log('Route Home Privacy, start dynamic import ./HomeDemoChunks/Privacy.js');
            import(
                /* webpackChunkName: "homePage" */
                "./HomeDemoChunks/Privacy.js").then((module) => {
                    console.log('Route Privacy, finish dynamic import module has been loaded', module);
                    window.homePage = { ...window.homePage, ...module.obj }
                    console.log('Route Privacy, merge data from module with window.homePage', module);
                });
        }
    },

};
function exec(controller, action) {
    action = action === undefined ? "init" : action;
    if (controller !== "" && routes[controller] && typeof routes[controller][action] === "function") {
        routes[controller][action]();
    }
};
const router = {
    init: function () {
        let body = document.body;
        let controller = body.getAttribute("data-controller");
        let action = body.getAttribute("data-action");

        exec(controller);
        exec(controller, action);
    }
};

export default router


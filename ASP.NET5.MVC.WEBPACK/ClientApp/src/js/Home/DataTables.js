

/*
 * importing the style in this way will connect the style automatically, without adding '<link ...' to the view
 * import ('datatables.net-bs/css/dataTables.bootstrap.css'); 
 * */
//creating a bundle for dependent styles, which will then need to be included in the view
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-searchbuilder-bs/css/searchBuilder.bootstrap.min.css';
import 'datatables.net-datetime/dist/dataTables.dateTime.min.css';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-searchbuilder';
import 'datatables.net-searchbuilder-bs';
import 'datatables.net-datetime';
import 'datatables.net-plugins/dataRender/datetime.js';
import 'datatables.net-plugins/sorting/datetime-moment.js';
import api from '../requestApi';
//when add the file dynamically from 'router.js' this entry is not needed, it will work without it
//uncomment if you want to manually include the file in view


export async function renderTable() {

    // Date renderer for DataTables from cdn.datatables.net/plug-ins/1.10.21/dataRender/datetime.js
    $.fn.dataTable.render.moment = function (from, to, locale) {
        // Argument shifting
        if (arguments.length === 1) {
            locale = 'ru';
            to = from;
            from = 'DD.MM.YYYY HH:mm:ss';
        }
        else if (arguments.length === 2) {
            locale = 'ru';
        }

        return function (d, type, row) {
            if (!d) {
                return type === 'sort' || type === 'type' ? 0 : d;
            }

            var m = window.moment(d, from, locale, true);

            // Order and type get a number value from Moment, everything else
            // sees the rendered value
            return m.format(type === 'sort' || type === 'type' ? 'x' : to);
        };
    };

    $.fn.dataTable.moment('DD.MM.YYYY');

    /*    (async () => {*/
 /*   let data = await api.get('https://dummyapi.io/data/api/post?limit=100');*/
    let table = $('#example').DataTable({
        proccessing: true,
        ajax: {
            url: "https://dummyapi.io/data/api/post?limit=100",
            type: "GET",
            async: true,
            headers: {
                'Content-Type': 'application/json',
                'app-id': '60a51ba424bc7732bde6c010'
            },
            dataSrc: function (response) {
                console.log('dataSrc', response);
                //if (response.aaData) {
                //    tableAddressIds = response.aaData.map((item, index) => { return item.Id });
                //}
                //if (firstInit) {
                //    firstInit = false;
                //}
                //else {
                //    var teamFilterBtn = $(teamsFilterSelectorId).next().find('button');
                //    teamFilterBtn.prop('disabled', '')
                //    var userGroupBtn = $(groupsFilterSelectorId).next().find('button');
                //    userGroupBtn.prop('disabled', '')
                //}
                return response.data;
            },
            data: function (data) {
                console.log('data',data);
                //if (firstInit) {
                //    var groupIdsFromUrl = window.VintegraWebApp.addressesPage.syncUrlData.getArrayParamUrl('pFg');
                //    if (groupIdsFromUrl !== null && groupIdsFromUrl !== undefined && groupIdsFromUrl.length > 0) {
                //        selectedGroups = [...groupIdsFromUrl].map((e, index) => { return e }).join(',');
                //    }
                //    var teamIdsFromUrl = window.VintegraWebApp.addressesPage.syncUrlData.getArrayParamUrl('pFt');
                //    if (teamIdsFromUrl !== null && teamIdsFromUrl !== undefined && teamIdsFromUrl.length > 0) {
                //        selectedTeams = [...teamIdsFromUrl].map((e, index) => { return e }).join(',');
                //    }
                //}
                //else {
                //    var teamFilterBtn = $(teamsFilterSelectorId).next().find('button');
                //    teamFilterBtn.prop('disabled', 'disabled')
                //    var userGroupBtn = $(groupsFilterSelectorId).next().find('button');
                //    userGroupBtn.prop('disabled', 'disabled')
                //}
                //data.userGroups = selectedGroups;
                //data.userTeams = selectedTeams;

                //data.withoutCoordinates = $('#withoutCoordinates').prop("checked");
                //return data;
            }
        },
        language: {
            processing:'<i class="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i>',
            searchBuilder: {
                add: '+',
                condition: 'Условие',
                clearAll: 'Сброс',
                deleteTitle: 'Удалить',
                data: 'Столбец',
                leftTitle: 'Лево',
                logicAnd: 'И',
                logicOr: 'или',
                rightTitle: 'Право',
                title: {
                    0: 'Фильтры',
                    _: 'Фильтры (%d)'
                },
                value: 'Значение',
                valueJoiner: 'и т. д.'
            }
        },
        searchBuilder: true,
      
        columns: [
            { "data": "image" },
            { "data": "publishDate" },
            { "data": "text" },
            { "data": "tags[, ]" },
            { "data": "link" },
            { "data": "likes" },
        ],
        columnDefs: [{
            targets: 1, render: function (data) {
                return moment(data).format('DD.MM.YYYY HH:mm:ss');
            }
        }]
    });
    table.searchBuilder.container().prependTo(table.table().container());
    /*    })();*/
}



console.log('Add js bundle manually in view. The \'Home DataTables\' bundle has been loaded!');
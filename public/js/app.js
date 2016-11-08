
$(document).ready(function(){
    var
        $jsonview 	= $('pre.json-view'),
        $main 		= $('main');

    function getJsonFromGoogleSpreadsheet(spreadsheet) {
        console.log('data', spreadsheet);
        spreadsheet
            .feed
            .entry
            .map(Lie.fromEntry)
            .forEach(function(lie){ $main.append(lie.toHtml()); })
            .map(getLieViewHtmlString)
            .forEach(function(lieView){ $main.append($(lieView)); });

    }

    function getJsonFromServer(){
        $.get('/data.json', function(data){
            console.info('grouped by category', _.groupBy(data, function(d){ return d.category; }));
            console.log(data);
            data.map(function(item){ return new Lie(item.date, item.statement, item.falsehood, item.analysis, item.category, item.keywords); })
                .forEach(function(lie){ $main.append($(lie.toHtml())); });
        })
    }

    getJsonFromServer();

})

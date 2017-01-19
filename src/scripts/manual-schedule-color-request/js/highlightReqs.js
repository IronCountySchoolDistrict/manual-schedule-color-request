import $ from "jquery";

export default function () {
    $(() => {
        var template = $($('#color-key-template').html());
        var select = $('.box-round');

        template.insertBefore(select);

        var psData = $.parseJSON($('#ps-data').data().ps);

        psData.scheduleRequests.splice(-1, 1);
        var requests = psData.scheduleRequests;

        var numRequests = requests.length - 1;
        var numRows = $('.box-round tr').length;

        //Loop through the table rows
        for (var i = 3; i < numRows; i++) {
            var courseNum = $('.box-round tr')[i].children[0].innerHTML;

            //Loop through the requests to find a match
            for (var j = 0; j < numRequests; j++) {
                //This is the request that matches the table row
                if (requests[j].course === courseNum) {

                    //It's a PRIMARY request -- color it green
                    if (requests[j].type === '') {
                        $('.box-round tr')[i].children[0].style.setProperty('background-color', '#00f000', '');
                        $('.box-round tr')[i].children[0].innerHTML += '&nbsp;&nbsp;(' + requests[j].priority + ')';
                    }
                    //It's an ELECTIVE (non-alt) -- color it yellow
                    else if (requests[j].type === 'E' && requests[j].alternate === 0) {
                        $('.box-round tr')[i].children[0].style.setProperty('background-color', '#f0f000', '');
                        $('.box-round tr')[i].children[0].innerHTML += '&nbsp;&nbsp;(' + requests[j].priority + ')';
                    }

                    //It's an ALT ELECTIVE -- color it red
                    else if (requests[j].type === 'E' && requests[j].alternate === 1) {
                        $('.box-round tr')[i].children[0].style.setProperty('background-color', '#f00000', '');
                        $('.box-round tr')[i].children[0].innerHTML += '&nbsp;&nbsp;(' + requests[j].priority + ')';
                    }
                }
            }
        }
    });
}
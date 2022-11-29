$(document).ready(() => {
    
    const url = "localhost:3001/api"
    initializeData();
    
    $("form#peopleCounter").submit((e) => {
        e.preventDefault();

        const data = {
            date: $("#peopleCounter #date").val(),
            imei: $("#peopleCounter #imei").val(),
            pao: $("#peopleCounter #pao").val(),
            busNum: $("#peopleCounter #busNum").val(),
            file: $("#peopleCounter #video")
        };
         
        $.ajax({
            url: `http://${url}/uploadFile`,
            data: JSON.stringify(data),
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            type: "POST",
            success: (response) => {
                console.log(response);
                // console.log("Response success");
            },
            error: (error) => {
                console.log(error);
            }
        });
    });

    $("#testButton").click((e) => {

        $.ajax({
            url: `http://${url}/testDisplay`,
            type:"POST",
            // data: {name: "test"},
            headers: {
                "Content-Type": "application/json",
            },
            success: (response) => {
                console.log("Response success");
            },
            error: (error) => {
                console.log(error);
            }
        })
    });

    function initializeData() {
        
        const getLocalDate = (value) => {
            const offset = new Date().getTimezoneOffset() * 1000 * 60,
            offsetDate = new Date(value).valueOf() - offset,
            date = new Date(offsetDate).toISOString();

            return date.substring(0, 10);
        }

        $("#peopleCounter #date").val(getLocalDate(new Date()));
    }
});
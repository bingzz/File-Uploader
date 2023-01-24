$(document).ready(() => {
	const url = 'localhost:3001/api';
    const videoFile = $('input#video');
    var rawFile = undefined;

    videoFile.on('change', (e) => {
        e.preventDefault();

        try {
            const reader = new FileReader();

        reader.onload = async () => {
            if (reader.readyState == 2) {
                if (reader.result) {
                    rawFile = await reader.result;
                } else {
                    rawFile = undefined;
                }
            }
        }

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        } else {
            rawFile = undefined;
        }
        } catch(error) {
            console.error(error)
        }
    })

	$('form#peopleCounter').submit(async (e) => {
		e.preventDefault();
        // console.log(videoFile.prop('files')[0]);

		const data = {
			date: $('#peopleCounter #date').val(),
			imei: $('#peopleCounter #imei').val(),
			pao: $('#peopleCounter #pao').val(),
			busNum: $('#peopleCounter #busNum').val(),
			file: rawFile,
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
		        console.error(error);
		    }
		});
	});

	$('#testButton').click(async (e) => {
		try {
			let res = await new Promise(async (resolve, reject) => {
				var result = await (await fetch(`http://${url}/testDisplay`)).json();
				if (result.test) {
					resolve('found');
				} else {
					reject('not found');
				}
			});

			console.log(res);
		} catch (error) {
			console.error(error);
		} finally {
			console.log('done');
		}
		
		// $.ajax({
		//     url: `http://${url}/testDisplay`,
		//     type:"GET",
		//     // data: {name: "test"},
		//     headers: {
		//         "Content-Type": "application/json",
		//     },
		//     success: (response) => {
		//         item =  response;
		//         console.log(item);
		//     },
		//     error: (error) => {
		//         console.log(error);
		//     }
		// })
	});

	function initializeData() {
		const getLocalDate = (value) => {
			const offset = new Date().getTimezoneOffset() * 1000 * 60,
				offsetDate = new Date(value).valueOf() - offset,
				date = new Date(offsetDate).toISOString();

			return date.substring(0, 10);
		};

		$('#peopleCounter #date').val(getLocalDate(new Date()));
	}
});

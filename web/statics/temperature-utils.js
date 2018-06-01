var dataset;

function ajax_callback(id, data) {
	console.log(data);
	dataset=data;
	draw_graph(id, dataset);
}

function query_dataset(id, start_date, start_time, end_date, end_time)
{
	// Convert input data to timestamp
	var result;
	var d = new Object();
	console.log("start "+start_date+" "+start_time);
	console.log("end "+end_date+" "+end_time);
	d.start = moment(start_date+" "+start_time,"YYYY/MM/DD HH:mm").format("X");
	d.end   = moment(end_date+" "+end_time,"YYYY/MM/DD HH:mm").format("X");

	r = $.ajax({
		type: "POST",
		url: "/get_data",
		data: JSON.stringify(d),
		dataType: "json",
		error: function () {alert('Error while requesting server !'); },
		}).success(function (data) { ajax_callback(id, data); });
	return dataset;
}


function draw_graph(id, json_data) 
{
	// Initialize our labels and datasets
	var labels = []
	var datasets = 
	[
		{
			label : 'T1',
			data  : [],
			borderColor: "#f55",
			fill  : false
		},
		{
			label : 'T2',
			data  : [],
			borderColor: "#5F5",
			fill  : false
		}
	]

	// Feed labels and datasets with original_data
	for (var v in json_data) {
		tmp = json_data[v]
		var m = moment.unix(tmp['ts']).format("DD/MM/YYYY HH:mm:ss");

		labels.push(m);
		datasets[0].data.push(tmp['t1']/1000);
		datasets[1].data.push(tmp['t2']/1000);
	};

	var ctx = id.get(0).getContext('2d');
	ctx.canvas.width = 1000;
	ctx.canvas.height = 500;
	var cfg = {
		type: 'line',
		data: {
			labels: labels,
			datasets: datasets
		}
	};
	var chart = new Chart(ctx, cfg);
}

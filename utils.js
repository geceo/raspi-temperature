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

	var ctx = document.getElementById(id).getContext('2d');
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

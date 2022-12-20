$(function() {
	$('#model-container').empty();
	$.getJSON('assets/model.json', function(data) {
		// JSON result in data variable
		for (item in data) {
			var name = data[item].name;
			var info_link = data[item].info_link;
			var creator = data[item].creator;
			var releases = data[item].releases;
			var tags = data[item].tags;
			var IDize = name.replace(/[^A-Za-z0-9]/g,""); // Use to make sure its doesnt break html
		}
		new ClipboardJS('.btn');
	})
	.fail(function() {
		$('#model-container').html('<p style="color:red">Data could not be loaded.</p>')
	});
});
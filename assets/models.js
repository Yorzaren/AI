$(function() {
	$('#model-container').empty();
	$.getJSON('assets/models.json', function(data) {
		// JSON result in data variable
		for (item in data) {
			var name = data[item].name;
			var info_link = data[item].info_link;
			var creator = data[item].creator;
			var releases = data[item].releases;
			var tags = data[item].tags;
			var IDize = name.replace(/[^A-Za-z0-9]/g,""); // Use to make sure its doesnt break html
			
			console.log(name, info_link, creator, releases, tags, IDize);
			
			for (i = 0; i < releases.length; i++) {
				var release_entry = releases[i];
				var r_name = release_entry.name;
				var date = release_entry.release_date;
				var download = release_entry.download_link;
				var hash = release_entry.SHA256;
				var desc = release_entry.description;
				console.log(r_name, date, download, hash, desc);
			} 
			
		}
		new ClipboardJS('.btn');
	})
	.fail(function() {
		$('#model-container').html('<p style="color:red">Data could not be loaded.</p>')
	});
});
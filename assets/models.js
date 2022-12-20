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
			var keyword = data[item].keyword;
			var IDize = name.replace(/[^A-Za-z0-9]/g,""); // Use to make sure its doesnt break html
			
			//console.log(name, info_link, creator, releases, keyword, tags, IDize);
			createModelItem(name, info_link, creator, releases, keyword, tags, IDize);
			
			// Add releases to the model card
			for (i = 0; i < releases.length; i++) {
				var release_entry = releases[i];
				
				var r_name = release_entry.name;
				var date = release_entry.release_date;
				var download = release_entry.download_link;
				var hash = release_entry.SHA256;
				var desc = release_entry.description;
				//console.log('model-item-'+IDize, r_name, date, download, hash, desc);
				createModelRelease('model-item-'+IDize, r_name, date, download, hash, desc);
			}
			
			// Add tags to the model card
			for (i = 0; i < tags.length; i++) {
				$('#model-item-'+IDize + ' .model-tag-container').append('<span class="model-tag">'+tags[i]+'</span>');
			}
			
		}
		new ClipboardJS('.btn');
	})
	.fail(function() {
		$('#model-container').html('<p style="color:red">Data could not be loaded.</p>')
	});
});


function createModelItem(name, info_link, creator, releases, keyword, tags, IDize) {
	var keyword_html = ''; 
	// Only define the html if needed.
	if (keyword != undefined) {
		keyword_html = `<div class="input-group mb-3"><span class="input-group-text">Keyword: &nbsp;<span style="cursor:pointer" title="Sometimes models have trigger words to influence generations">[?]</span></span><input type="text" class="form-control" value="${keyword}" id="model-item-${IDize}-keyword"><button class="btn" type="button" data-clipboard-target="#model-item-${IDize}-keyword">Copy <i class="bi bi-clipboard2-fill"></i></button></div>`;
	}
	var html = `<div class="model-item" id="model-item-${IDize}">
				<h2>${name} by <span class="creator-tag">${creator}</span> <a href="${info_link}" title="Go to Model Card"><i class="bi-file-earmark-code-fill" role="img" aria-label="Model Card"></i></a></h2>
				<div class="releases-container"></div>
				${keyword_html}
				<div class="model-tag-container">
					<b>Tags:</b>
				</div>
			</div>
	`;
	$('#model-container').append(html);
}

function createModelRelease(element_target, r_name, date, download, hash, desc) {
	var desc_html = '';
	if (desc != undefined) {
		desc_html = `<br><b>Description: </b>${desc}</div>`
	}
	release_html = `<div class="release"><h4>${r_name} (${date}) <a href="${download}" title="Download Model"><i class="bi bi-download"></i></a></h4><b>SHA256: </b><code>${hash}</code>${desc_html}`
	$('#'+element_target+' .releases-container').append(release_html);
}
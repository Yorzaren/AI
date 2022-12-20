$(function() {
	$('#embedding-container').empty();
	$.getJSON('assets/embeddings.json', function(data) {
		// JSON result in data variable
		for (item in data) {
			var name = data[item].name;
			var source = data[item].source;
			var token = data[item].token_word;
			var images = data[item].images;
			var IDize = name.replace(/[^A-Za-z0-9]/g,"");

			
			console.log(name, source, token, images);
			console.log(images.length);
			if (name != 'EmbeddingName') {
			createEmbeddingItem(name, source, token, images, IDize);
			}

		}
		new ClipboardJS('.btn');
	})
	.fail(function() {
		$('#embedding-container').html('<p style="color:red">Data could not be loaded.</p>')
	});
});

function createEmbeddingItem(name, source, token_word, images, IDize) {
	var html = `<div class="embedding-item" id="embedding-item-${IDize}">
			<h2>${name} <a href="${source}" title="Go to Repo"><i class="bi-file-earmark-code-fill" role="img" aria-label="Source Files"></i></a>
			</h2>
			<div id="carousel-embedding-item-${IDize}" class="carousel slide" data-bs-ride="carousel"><div class="carousel-indicators"></div>
				<div class="carousel-inner">
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#embedding-item-${IDize}" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#embedding-item-${IDize}" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			
			</div>
			<div class="input-group mb-3">
				<span class="input-group-text">Token Word</span>
				<input type="text" class="form-control" value="${token_word}" id="embedding-item-${IDize}-token">
				<button class="btn" type="button" data-clipboard-target="#embedding-item-${IDize}-token">Copy <i class="bi bi-clipboard2-fill"></i>
				</button>
			</div>
		</div>
	`;
	$('#embedding-container').append(html);
	var isFirst = true;
	for (image_item in images) {
		// A slide item must be set as active for it to work
		if (isFirst) {
			$('#carousel-embedding-item-'+IDize+' .carousel-indicators').append('<button type="button" class="active" data-bs-target="#carousel-embedding-item-'+IDize+'" data-bs-slide-to="'+image_item+'" aria-label="Slide '+Number(image_item)+1+'"></button>');
			$('#carousel-embedding-item-'+IDize+' .carousel-inner').append('<div class="carousel-item active"><img src="'+images[image_item]+'" class="d-block w-100"></div>');

			isFirst = false;
		} else {
			$('#carousel-embedding-item-'+IDize+' .carousel-indicators').append('<button type="button" data-bs-target="#carousel-embedding-item-'+IDize+'" data-bs-slide-to="'+image_item+'" aria-label="Slide '+Number(image_item)+1+'"></button>');
			$('#carousel-embedding-item-'+IDize+' .carousel-inner').append('<div class="carousel-item"><img src="'+images[image_item]+'" class="d-block w-100"></div>');
		}
	}
	
	new bootstrap.Carousel($('#carousel-embedding-item-'+IDize), {
	  interval: 2000 // 2 secs
	})
	
	// Enabling carousel controls
	$('#carousel-embedding-item-'+IDize+' .carousel-control-prev').click(function(){
		$('#carousel-embedding-item-'+IDize).carousel('prev');
	});
	$('#carousel-embedding-item-'+IDize+' .carousel-control-next').click(function(){
		$('#carousel-embedding-item-'+IDize).carousel('next');
	});
}
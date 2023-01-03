

var images = document.querySelectorAll('.prose img');

var input = document.createElement('textarea');
input.setAttribute("id", "export-info");
input.setAttribute("style", "width:50%;height:50%;position: fixed;top: 25%;left: 25%;");
document.body.appendChild(input);

var textarea = document.getElementById('export-info');

textarea.value += "{\n";
textarea.value += "    \"name\": \"INSERT_NAME\",\n";
textarea.value += "    \"source\": \""+location.href +"\",\n";
textarea.value += "    \"images\": [\n";

for (var i in images) {
	if (images[i].src != undefined) {
		console.log(images[i].src);
		if(i == images.length - 1) {
			textarea.value += '      "' + images[i].src + '"\n';
		} else {
			textarea.value += '      "' + images[i].src + '",\n';
		}
	}
}
textarea.value += "    ],\n";
textarea.value += "    \"token_word\": \"<INSERT_TOKEN>\"\n";
textarea.value += "  };
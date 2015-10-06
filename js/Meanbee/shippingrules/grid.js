(function () {
	document.addEventListener("DOMContentLoaded", function (evt) {
		function recurseUpTo (tagName, fromElement) {
			if (tagName === fromElement.tagName.toLowerCase()) {
				return fromElement;
			} else {
				return recurseUpTo(tagName, fromElement.parentElement);
			}
		}
		function stopPropagation (evt) {
			evt.stopPropagation();
		}
		function forcePropagation (evt) {
			var clickTarget = recurseUpTo("td", evt.target);
			console.dir(clickTarget);
			clickTarget.click();
		}
		[].forEach.call(document.querySelectorAll("#meanbee_shippingrules_grid_table details"), function (details) {
			details.addEventListener("click", stopPropagation, false);
			details.addEventListener("dblclick", forcePropagation, false);
		});
	}, false);
}());

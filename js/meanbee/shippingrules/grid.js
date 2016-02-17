(function() {
  document.addEventListener('DOMContentLoaded', function(evt) {
    /**
     * Find parent element of `fromElement` with `tagName`.
     * @param String  tagName
     * @param Element fromElement
     * @return Element
     */
    function recurseUpTo(tagName, fromElement) {
      if (tagName === fromElement.tagName.toLowerCase()) {
        return fromElement;
      } else {
        return recurseUpTo(tagName, fromElement.parentElement);
      }
    }

    /** Stops event propogating through the DOM. */
    function stopPropagation(evt) {
      evt.stopPropagation();
    }

    /** Redirects as click event to table cell. */
    function forcePropagation(evt) {
      var clickTarget = recurseUpTo('td', evt.target);
      console.dir(clickTarget);
      clickTarget.click();
    }

    // Attach event listeners.
    [].forEach.call(document.querySelectorAll('#meanbee_shippingrules_grid_table details'), function(details) {
      details.addEventListener('click', stopPropagation, false);
      details.addEventListener('dblclick', forcePropagation, false);
    });
  }, false);
}());

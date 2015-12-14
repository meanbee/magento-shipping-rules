(function() {
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
      var T, k, O, len;
      if (this == null) throw new TypeError(' this is null or not defined'); // jshint ignore:line
      O = Object(this);
      len = O.length >>> 0;
      if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
      if (arguments.length > 1) T = thisArg;
      for (k = 0; k < len; k++) {
        var kValue;
        if (k in O) {
          kValue = O[k];
          callback.call(T, kValue, k, O);
        }
      }
    };
  }

  var ALPHABETIC = 'str';
  var NUMERIC_BASE10 = 'b10';
  var NUMERIC_BASE26 = 'b26';
  var NUMERIC_BASE36 = 'b36';
  var CONSTANT = '';
  var postalCodeData = {
    AU: [NUMERIC_BASE10],
    AI: [NUMERIC_BASE10],
    AT: [NUMERIC_BASE10],
    AQ: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE10, NUMERIC_BASE26],
    BE: [NUMERIC_BASE10],
    BR: [NUMERIC_BASE10, NUMERIC_BASE10, NUMERIC_BASE10],
    CA: [NUMERIC_BASE36, NUMERIC_BASE36, NUMERIC_BASE36],
    DE: [NUMERIC_BASE10],
    DK: [NUMERIC_BASE10],
    ES: [NUMERIC_BASE10],
    FK: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE10, NUMERIC_BASE26],
    FO: [NUMERIC_BASE10],
    GB: [ALPHABETIC,     ALPHABETIC,     NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26],
    'GB+': [CONSTANT,    CONSTANT,       NUMERIC_BASE10],
    GG: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26],
    GI: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE10, NUMERIC_BASE10, NUMERIC_BASE26],
    GS: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE10, NUMERIC_BASE26],
    IM: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26],
    HU: [NUMERIC_BASE10],
    IO: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE10, NUMERIC_BASE26],
    IT: [NUMERIC_BASE10],
    JE: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26],
    JP: [NUMERIC_BASE10, NUMERIC_BASE10, NUMERIC_BASE10],
    LU: [NUMERIC_BASE10],
    NL: [NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26],
    SE: [NUMERIC_BASE10, NUMERIC_BASE10, NUMERIC_BASE10],
    SH: [ALPHABETIC,     ALPHABETIC,     NUMERIC_BASE10, NUMERIC_BASE26],
    PN: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE10, NUMERIC_BASE26],
    RU: [NUMERIC_BASE10],
    TC: [NUMERIC_BASE36, CONSTANT,       NUMERIC_BASE10, NUMERIC_BASE26],
    PL: [NUMERIC_BASE36, NUMERIC_BASE10, NUMERIC_BASE26],
    US: [NUMERIC_BASE10, NUMERIC_BASE10, NUMERIC_BASE10],
  };

  function postalCodeFormatChangeHandler(event) {
    var parts = postalCodeData[event.target.value];
    var container = event.target.parentElement.parentElement.parentElement;

    [].forEach.call(container.querySelectorAll('option[value^="meanship/rule_condition|dest_postal_code"]'), function(option) {
      option.style.display = 'none';
    });

    for (var i = 0; i < parts.length; i++) {
      var option;
      if (option = container.querySelector('option[value="meanship/rule_condition|dest_postal_code_p' + i + '_' + parts[i] + '"]')) { // jshint ignore:line
        option.style.display = 'initial';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('conditions_fieldset').addEventListener('change', function(event) {
      if (event.target.parentElement.parentElement.previousElementSibling.value === 'meanship/rule_condition_postalCode') {
        postalCodeFormatChangeHandler(event);
      }
    });
  }, false);
}());

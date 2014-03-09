/// <reference path="../../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    (function (Forms) {
        var Formatting = (function () {
            function Formatting() {
            }
            Formatting.ToInt = function (value, defaultValue) {
                if (typeof defaultValue === "undefined") { defaultValue = 0; }
                if (value == '')
                    value = defaultValue;

                value = value.toString().replace('$', '').replace(',', '');

                if (isNaN(value))
                    value = defaultValue;

                return parseInt(value);
            };

            Formatting.ToFloat = function (value, defaultValue) {
                if (typeof defaultValue === "undefined") { defaultValue = 0.0; }
                if (value === '')
                    value = defaultValue;

                value = value.toString().replace('$', '').replace(',', '');

                if (isNaN(value))
                    value = defaultValue;

                return parseFloat(value);
            };

            Formatting.ToCurrency = function (value) {
                //<!-- Original:  Cyanide_7 (leo7278@hotmail.com) -->
                //<!-- Web Site:  http://www7.ewebcity.com/cyanide7 -->
                //<!-- This script and many more are available free online at -->
                //<!-- The JavaScript Source!! http://javascript.internet.com -->
                //<!-- Begin
                value = value.toString().replace(/\$|\,/g, '');
                if (isNaN(value))
                    value = "0";
                var sign = (value == (value = Math.abs(value)));
                value = Math.floor(value * 100 + 0.50000000001);
                var cents = value % 100;
                value = Math.floor(value / 100).toString();
                if (cents < 10)
                    cents = "0" + cents;
                for (var i = 0; i < Math.floor((value.length - (1 + i)) / 3); i++)
                    value = value.substring(0, value.length - (4 * i + 3)) + ',' + value.substring(value.length - (4 * i + 3));
                return (((sign) ? '' : '-') + '$' + value + '.' + cents);
                //  End -->
            };

            Formatting.FormatForm = function ($form) {
                $('[type="text"]', $form).each(function () {
                    var $this = $(this);
                    this.FormatInput($this);
                    return true;
                });
            };

            Formatting.FormatInput = function ($input) {
                var formatType = $input.attr('data-formatter') || '', attrs = formatType.split('-');

                switch (attrs[0]) {
                    case 'int':
                        $input.val(this.ToInt($input.val()).toString());
                        break;
                    case 'float':
                        var val = this.ToFloat($input.val()), decimalPlaces = this.ToInt(attrs[1] || 0, 0);

                        if (decimalPlaces) {
                            val = val.toFixed(decimalPlaces);
                        }

                        $input.val(val.toString());
                        break;
                    case 'currency':
                        $input.val(this.ToCurrency($input.val()).toString());
                        break;
                }
            };

            Formatting.FormatFormInputsOnChange = function ($form, onPostFormat) {
                if (typeof onPostFormat === "undefined") { onPostFormat = null; }
                $form.on('change', 'input[type="text"][data-formatter]', function (event) {
                    var $this = $(this);
                    A7.Forms.Formatting.FormatInput($this);
                    if (onPostFormat)
                        onPostFormat($this);
                });
            };

            Formatting.ResetFormValues = function ($form) {
                $('[type="text"], [type="email"], [type="password"], [type="tel"], textarea', $form).each(function () {
                    $(this).val('');
                    return true;
                });
                $('select', $form).each(function () {
                    this.selectedIndex = 0;
                    return true;
                });
            };
            return Formatting;
        })();
        Forms.Formatting = Formatting;
    })(A7.Forms || (A7.Forms = {}));
    var Forms = A7.Forms;
})(A7 || (A7 = {}));

/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Forms.Formatting {

    export function ToInt(value: any, defaultValue: number = 0): number {
        if (value == '')
            value = defaultValue;

        value = value
            .toString()
            .replace('$', '')
            .replace(',', '');

        if (isNaN(value))
            value = defaultValue;

        return parseInt(value);
    }

    export function ToFloat(value: any, defaultValue: number = 0.0): number {
        if (value === '')
            value = defaultValue;

        value = value
            .toString()
            .replace('$', '')
            .replace(',', '');

        if (isNaN(value))
            value = defaultValue;

        return parseFloat(value);
    }

    export function ToCurrency(value: any): string {
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
        var cents: any = value % 100;
        value = Math.floor(value / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((value.length - (1 + i)) / 3); i++)
            value = value.substring(0, value.length - (4 * i + 3)) + ',' + value.substring(value.length - (4 * i + 3));
        return (((sign) ? '' : '-') + '$' + value + '.' + cents);
        //  End -->
    }

    export function FormatForm($form: JQuery): void {
        $('[type="text"]', $form).each(function () {
            var $this = $(this);
            this.FormatInput($this);
            return true;
        });
    }

    export function FormatInput($input: JQuery): void {
        var formatType = $input.attr('data-formatter') || '',
            attrs = formatType.split('-');

        switch (attrs[0]) {
            case 'int':
                $input.val(this.ToInt($input.val()).toString());
                break;
            case 'float':
                var val: any = this.ToFloat($input.val()),
                    decimalPlaces = this.ToInt(attrs[1] || 0, 0);

                if (decimalPlaces) {
                    val = val.toFixed(decimalPlaces);
                }

                $input.val(val.toString());
                break;
            case 'currency':
                $input.val(this.ToCurrency($input.val()).toString());
                break;
        }
    }

    export function FormatFormInputsOnChange($form: JQuery, onPostFormat: ($input: JQuery) => void = null): void {
        $form.on('change', 'input[type="text"][data-formatter]', function (event) {
            var $this = $(this);
            A7.Forms.Formatting.FormatInput($this);
            if (onPostFormat) onPostFormat($this);
        });
    }

    export function ResetFormValues($form: JQuery): void {
        $('[type="text"], [type="email"], [type="password"], [type="tel"], textarea', $form).each(function () {
            $(this).val('');
            return true;
        });
        $('select', $form).each(function () {
            this.selectedIndex = 0;
            return true;
        });
    }   

    export function FormatControlWhileUpdating($input: JQuery, updateCompletePromise: JQueryPromise<any>) {  
        formatBeforeUpdateFormControl($input);
        updateCompletePromise
            .done(() => formatAfterUpdateFormControl($input))
            .fail(() => formatAfterFailedUpdateFormControl($input));
    }

    function formatBeforeUpdateFormControl($input: JQuery){
        if (!$input.parent().hasClass('input-group')) $input.wrap('<div class="input-group">');
        $input.parent().append('<span class="input-group-addon input-group-update-addon"><i class="fa fa-circle-o-notch fa-spin"></i></span>');
    }

    function formatAfterUpdateFormControl($input: JQuery) {
        var $inputAddon = $input.parent().find('.input-group-update-addon');

        if ($inputAddon.length == 0) return;
        
        $inputAddon.html('<i class="fa fa-check text-success"></i>').find('i').fadeOut(1500,() => {
            $inputAddon.remove();
            if ($input.parent().find('.input-group-addon').length == 0) $input.unwrap();            
       });
    }

    function formatAfterFailedUpdateFormControl($input: JQuery) {
        var $inputAddon = $input.parent().find('.input-group-update-addon');

        if ($inputAddon.length == 0) return;

        $inputAddon.html('<i class="fa fa-warning text-danger"></i>').find('i').fadeOut(5000,() => {
            $inputAddon.remove();
            if ($input.parent().find('.input-group-addon').length == 0) $input.unwrap();
        });
    }

}
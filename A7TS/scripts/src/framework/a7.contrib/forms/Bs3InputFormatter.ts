
namespace A7.Contrib.Forms.Bs3InputFormatter {

    export function FormatControlWhileUpdating($input: JQuery, updateCompletePromise: JQueryPromise<any>) {
        formatBeforeUpdateFormControl($input);
        updateCompletePromise
            .done(() => formatAfterUpdateFormControl($input))
            .fail(() => formatAfterFailedUpdateFormControl($input));
    }

    function formatBeforeUpdateFormControl($input: JQuery) {
        if (!$input.parent().hasClass('input-group')) $input.wrap('<div class="input-group">');
        $input.parent().append('<span class="input-group-addon input-group-update-addon"><i class="fa fa-circle-o-notch fa-spin"></i></span>');
    }

    function formatAfterUpdateFormControl($input: JQuery) {
        var $inputAddon = $input.parent().find('.input-group-update-addon');

        if ($inputAddon.length == 0) return;

        $inputAddon.html('<i class="fa fa-check text-success"></i>').find('i').fadeOut(1500, () => {
            $inputAddon.remove();
            if ($input.parent().find('.input-group-addon').length == 0) $input.unwrap();
        });
    }

    function formatAfterFailedUpdateFormControl($input: JQuery) {
        var $inputAddon = $input.parent().find('.input-group-update-addon');

        if ($inputAddon.length == 0) return;

        $inputAddon.html('<i class="fa fa-warning text-danger"></i>').find('i').fadeOut(5000, () => {
            $inputAddon.remove();
            if ($input.parent().find('.input-group-addon').length == 0) $input.unwrap();
        });
    }

}
/**
 * Created by ycb on 2016/8/8.
 */

function FormValiadte() {
    this.el = undefined;
    this.rules = undefined;
    this.messages = undefined;
    this.invalidHandler = undefined;
    this.submitHandler = undefined;
}


function initValiadte(formValiadte) {
    formValiadte.el.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: formValiadte.rules,
        messages: formValiadte.messages,

        invalidHandler: formValiadte.invalidHandler,
        
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },

        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.form-group div'));
        },

        submitHandler: formValiadte.submitHandler
    });

    return formValiadte.el;
}


var Process = function () {


    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            var form = $('#p_process_submit_form');
            var error = $('.alert-error', form);
            var success = $('.alert-success', form);

            form.validate({
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'validate-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {

                    process_step1: {
                        maxlength: 100,
                        required: true
                    },
                    step_content1: {
                        maxlength: 260,
                        required: true
                    },
                    process_step2: {
                        maxlength: 100,
                        required: true
                    },
                    step_content2: {
                        maxlength: 260,
                        required: true
                    },
                    process_step3: {
                        maxlength: 100,
                        required: true
                    },
                    step_content3: {
                        maxlength: 260,
                        required: true
                    },
                    process_step4: {
                        maxlength: 100,
                        required: true
                    },
                    step_content4: {
                        maxlength: 260,
                        required: true
                    },
                    process_step5: {
                        maxlength: 100,
                        required: true
                    },
                    step_content5: {
                        maxlength: 260,
                        required: true
                    },

                    'payment[]': {
                        required: true,
                        minlength: 1
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    'payment[]': {
                        required: "Please select at least one option",
                        minlength: jQuery.format("Please select at least one option")
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    error.insertAfter(element); // for other inputs, just perform default behavoir
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   
                    success.hide();
                    error.show();
                    App.scrollTo(error, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.help-inline').removeClass('ok'); // display OK icon
                    $(element)
                        .closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element)
                        .closest('.control-group').removeClass('error'); // set error class to the control group
                },

                success: function (label) {
                    // display success icon for other inputs
                    label
                        .addClass('valid ok') // mark the current input as valid and display OK icon
                        .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group

                },

                submitHandler: function (form) {
                    success.show();
                    error.hide();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax

                }

            });

            var displayConfirm = function() {
                $('.display-value', form).each(function(){
                    var input = $('[name="'+$(this).attr("data-display")+'"]', form);
                    if (input.is(":text") || input.is("textarea")) {
                        $(this).html(input.val());
                    } else if (input.is("select")) {
                        $(this).html(input.find('option:selected').text());
                    } else if (input.is(":radio") && input.is(":checked")) {
                        $(this).html(input.attr("data-title"));
                    }
                });
            };

            // default form wizard
            $('#form_process_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index) {
                    alert('步骤内容填写不完整');
                    return false;
                },
                onNext: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    if (form.valid() == false) {
                        return false;
                    }

                    var total = navigation.find('li').length;
                    var current = index + 1;
                    // set wizard title
                    $('.step-title', $('#form_process_1')).text('Step ' + (index + 1) + ' of ' + total);
                    // set done steps
                    jQuery('li', $('#form_process_1')).removeClass("done");
                    var li_list = navigation.find('li');
                    for (var i = 0; i < index; i++) {
                        jQuery(li_list[i]).addClass("done");
                    }

                    if (current == 1) {
                        $('#form_process_1').find('.button-previous').hide();
                    } else {
                        $('#form_process_1').find('.button-previous').show();
                    }

                    if (current >= total) {
                        $('#form_process_1').find('.button-next').hide();
                        $('#form_process_1').find('.button-submit').show();
                        displayConfirm();
                    } else {
                        $('#form_process_1').find('.button-next').show();
                        $('#form_process_1').find('.button-submit').hide();
                    }
                    App.scrollTo($('.page-title'));
                },
                onPrevious: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    var total = navigation.find('li').length;
                    var current = index + 1;
                    // set wizard title
                    $('.step-title', $('#form_process_1')).text('Step ' + (index + 1) + ' of ' + total);
                    // set done steps
                    jQuery('li', $('#form_process_1')).removeClass("done");
                    var li_list = navigation.find('li');
                    for (var i = 0; i < index; i++) {
                        jQuery(li_list[i]).addClass("done");
                    }

                    if (current == 1) {
                        $('#form_process_1').find('.button-previous').hide();
                    } else {
                        $('#form_process_1').find('.button-previous').show();
                    }

                    if (current >= total) {
                        $('#form_process_1').find('.button-next').hide();
                        $('#form_process_1').find('.button-submit').show();
                    } else {
                        $('#form_process_1').find('.button-next').show();
                        $('#form_process_1').find('.button-submit').hide();
                    }

                    App.scrollTo($('.page-title'));
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_process_1').find('.bar').css({
                        width: $percent + '%'
                    });
                }
            });


            var submitFunction = function () {
                var proList = [];
                var i = 0;

                $('.display-value', form).each(function(){
                    var input = $('[name="'+$(this).attr("data-display")+'"]', form);
                    proList[i] = input.val();
                    i++;
                });
                $.ajax({
                    type: "POST",
                    url: "/process_addresult/",
                    traditional:true,
                    data: {proList:proList},
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 'success') {
                            alert("success");
                        } else {
                            alert("failed");
                            return false;
                        }
                    },
                    error: function (err) {
                        alert("提交失败");
                    }
                });
            };

            $('#form_process_1').find('.button-previous').hide();
            $('#form_process_1 .button-submit').click(function () {
                submitFunction();
            }).hide();
        }

    };

}();
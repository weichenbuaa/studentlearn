var RoleAdd = function () {

    var initRoleValues = function () {

        var partner_value = $('#partner_value').val();
        var air_tickets_value = $('#air_tickets_value').val();
        var visa_value = $('#visa_value').val();

        $("#partner option").each(function () {
            if ($(this).val() == partner_value) {
                $(this).attr("selected", true);
            }
        });

        $("#air_tickets  :radio").each(function () {
            if ($(this).val() == air_tickets_value) {
                $(this).attr("checked", true);
            }
        });

        $("#visa  :radio").each(function () {
            if ($(this).val() == visa_value) {
                $(this).attr("checked", true);
            }
        });

    };

    var handleValidation = function () {

        var form1 = $('#form_role_add');
        var error1 = $('.alert-error', form1);
        var success1 = $('.alert-success', form1);

        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                role: {
                    maxlength: 50,
                    minlength: 2,
                    required: true
                },
                status: {
                    required: true,
                    maxlength: 1
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                success1.hide();
                error1.show();
                App.scrollTo(error1, -200);
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
                label
                    .addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                    .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
            },

            submitHandler: function (form) {
                //success1.show();
                error1.hide();
                form.submit()
            }
        });

    };

    var cancelFunction = function () {

        $('#form_role_cancel').click(function () {
            window.history.go(-1);
        });

    };

    var handleWysihtml5 = function () {
        if (!jQuery().wysihtml5) {
            return;
        }

        if ($('.wysihtml5').size() > 0) {
            $('.wysihtml5').wysihtml5({
                "stylesheets": ["assets/plugins/bootstrap-wysihtml5/wysiwyg-color.css"]
            });
        }
    };

    var resetWysihtml5 = function () {
        if (!jQuery().wysihtml5) {
            return;
        }

        if ($('.wysihtml5').size() > 0) {
            $('.wysihtml5').wysihtml5({
                "stylesheets": ["assets/plugins/bootstrap-wysihtml5/wysiwyg-color.css"]
            });
        }
    };

    var handleToggleButtons = function () {
        if (!jQuery().toggleButtons) {
            return;
        }
        $('.basic-toggle-button').toggleButtons();
        $('.text-toggle-button').toggleButtons({
            width: 200,
            label: {
                enabled: "Lorem Ipsum",
                disabled: "Dolor Sit"
            }
        });
        $('.danger-toggle-button').toggleButtons({
            style: {
                // Accepted values ["primary", "danger", "info", "success", "warning"] or nothing
                enabled: "danger",
                disabled: "info"
            }
        });
        $('.info-toggle-button').toggleButtons({
            style: {
                enabled: "info",
                disabled: ""
            }
        });
        $('.success-toggle-button').toggleButtons({
            style: {
                enabled: "success",
                disabled: "info"
            }
        });
        $('.warning-toggle-button').toggleButtons({
            style: {
                enabled: "warning",
                disabled: "info"
            }
        });

        $('.height-toggle-button').toggleButtons({
            height: 100,
            font: {
                'line-height': '100px',
                'font-size': '20px',
                'font-style': 'italic'
            }
        });
    };

    var handleTagsInput = function () {
        if (!jQuery().tagsInput) {
            return;
        }
        $('#tags_1').tagsInput({
            width: 'auto',
            'onAddTag': function () {
                //alert(1);
            },
        });
        $('#tags_2').tagsInput({
            width: 240
        });
    };

    var handlejQueryUIDatePickers = function () {
        $(".ui-date-picker").datepicker();
    };

    var handleDatePickers = function () {

        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                rtl: App.isRTL()
            });
        }
    };

    var handleTimePickers = function () {

        if (jQuery().timepicker) {
            $('.timepicker-default').timepicker();
            $('.timepicker-24').timepicker({
                minuteStep: 1,
                showSeconds: true,
                showMeridian: false
            });
        }
    };

    var handleDateRangePickers = function () {
        if (!jQuery().daterangepicker) {
            return;
        }

        $('.date-range').daterangepicker(
            {
                opens: (App.isRTL() ? 'left' : 'right'),
                format: 'dd/MM/yyyy',
                separator: ' 至 ',
                startDate: Date.today(),
                endDate: Date.today().add({
                    days: 29
                }),
                // minDate: '01/01/2012',
                // maxDate: '12/31/2014',
                locale: {
                    applyLabel: '确定',
                    fromLabel: '开始日期',
                    toLabel: '结束日期',
                    // customRangeLabel: 'Custom Range',
                    // daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    // monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            }
        );

        $('#form-date-range').daterangepicker({
                ranges: {
                    'Today': ['today', 'today'],
                    'Yesterday': ['yesterday', 'yesterday'],
                    'Last 7 Days': [Date.today().add({
                        days: -6
                    }), 'today'],
                    'Last 29 Days': [Date.today().add({
                        days: -29
                    }), 'today'],
                    'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                    'Last Month': [Date.today().moveToFirstDayOfMonth().add({
                        months: -1
                    }), Date.today().moveToFirstDayOfMonth().add({
                        days: -1
                    })]
                },
                opens: (App.isRTL() ? 'left' : 'right'),
                format: 'MM/dd/yyyy',
                separator: ' to ',
                startDate: Date.today().add({
                    days: -29
                }),
                endDate: Date.today(),
                minDate: '01/01/2012',
                maxDate: '12/31/2014',
                locale: {
                    applyLabel: 'Submit',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                },
                showWeekNumbers: true,
                buttonClasses: ['btn-danger']
            },

            function (start, end) {
                $('#form-date-range span').html(start.toString('MMMM d, yyyy') + ' - ' + end.toString('MMMM d, yyyy'));
            });

        $('#form-date-range span').html(Date.today().add({
                days: -29
            }).toString('MMMM d, yyyy') + ' - ' + Date.today().toString('MMMM d, yyyy'));


        //modal version:

        $('#form-date-range-modal').daterangepicker({
                ranges: {
                    'Today': ['today', 'today'],
                    'Yesterday': ['yesterday', 'yesterday'],
                    'Last 7 Days': [Date.today().add({
                        days: -6
                    }), 'today'],
                    'Last 29 Days': [Date.today().add({
                        days: -29
                    }), 'today'],
                    'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                    'Last Month': [Date.today().moveToFirstDayOfMonth().add({
                        months: -1
                    }), Date.today().moveToFirstDayOfMonth().add({
                        days: -1
                    })]
                },
                opens: (App.isRTL() ? 'left' : 'right'),
                format: 'dd/MM/yyyy',
                separator: ' to ',
                startDate: Date.today(),
                // endDate: Date.today(),
                // minDate: '01/01/2012',
                // maxDate: '12/31/2014',
                locale: {
                    applyLabel: 'Submit',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                },
                showWeekNumbers: true,
                buttonClasses: ['btn-danger']
            },

            function (start, end) {
                $('#form-date-range-modal span').html(start.toString('MMMM d, yyyy') + ' - ' + end.toString('MMMM d, yyyy'));
            });

        $('#form-date-range-modal span').html(Date.today().add({
                days: -29
            }).toString('MMMM d, yyyy') + ' - ' + Date.today().toString('MMMM d, yyyy'));

    };

    var handleDatetimePicker = function () {

        $(".form_datetime").datetimepicker({
            format: "dd MM yyyy - hh:ii",
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
        });

        $(".form_advance_datetime").datetimepicker({
            format: "dd MM yyyy - hh:ii",
            autoclose: true,
            todayBtn: true,
            startDate: "2013-02-14 10:00",
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
            minuteStep: 10
        });

        $(".form_meridian_datetime").datetimepicker({
            format: "dd MM yyyy - HH:ii P",
            showMeridian: true,
            autoclose: true,
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
            todayBtn: true
        });
    };

    var handleClockfaceTimePickers = function () {

        if (!jQuery().clockface) {
            return;
        }

        $('.clockface_1').clockface();

        $('#clockface_2').clockface({
            format: 'HH:mm',
            trigger: 'manual'
        });

        $('#clockface_2_toggle').click(function (e) {
            e.stopPropagation();
            $('#clockface_2').clockface('toggle');
        });

        $('#clockface_2_modal').clockface({
            format: 'HH:mm',
            trigger: 'manual'
        });

        $('#clockface_2_modal_toggle').click(function (e) {
            e.stopPropagation();
            $('#clockface_2_modal').clockface('toggle');
        });

        $('.clockface_3').clockface({
            format: 'H:mm'
        }).clockface('show', '14:30');
    };

    var handleColorPicker = function () {
        if (!jQuery().colorpicker) {
            return;
        }
        $('.colorpicker-default').colorpicker({
            format: 'hex'
        });
        $('.colorpicker-rgba').colorpicker();
    };

    var handleInputMasks = function () {
        $.extend($.inputmask.defaults, {
            'autounmask': true
        });

        $("#mask_date").inputmask("d/m/y", {autoUnmask: true});  //direct mask
        $("#mask_date1").inputmask("d/m/y", {"placeholder": "*"}); //change the placeholder
        $("#mask_date2").inputmask("d/m/y", {"placeholder": "dd/mm/yyyy"}); //multi-char placeholder
        $("#mask_phone").inputmask("mask", {"mask": "(999) 999-9999"}); //specifying fn & options
        $("#mask_tin").inputmask({"mask": "99-9999999"}); //specifying options only
        $("#mask_number").inputmask({"mask": "9", "repeat": 10, "greedy": false});  // ~ mask "9" or mask "99" or ... mask "9999999999"
        $("#mask_decimal").inputmask('decimal', {rightAlignNumerics: false}); //disables the right alignment of the decimal input
        $("#mask_currency").inputmask('€ 999.999.999,99', {numericInput: true});  //123456  =>  € ___.__1.234,56

        $("#mask_currency2").inputmask('€ 999,999,999.99', {
            numericInput: true,
            rightAlignNumerics: false,
            greedy: false
        }); //123456  =>  € ___.__1.234,56
        $("#mask_ssn").inputmask("999-99-9999", {placeholder: " ", clearMaskOnLostFocus: true}); //default
    };


    return {
        //main function to initiate the module
        init: function () {
            handleValidation();
            cancelFunction();
            handleWysihtml5();
            handleToggleButtons();
            handleTagsInput();
            handlejQueryUIDatePickers();
            handleDatePickers();
            handleTimePickers();
            handleDatetimePicker();
            handleDateRangePickers();
            handleClockfaceTimePickers();
            handleColorPicker();
            handleInputMasks();
            initRoleValues();

            App.addResponsiveHandler(function () {
                resetWysihtml5();
            })
        }

    };

}();
var CustomerShow = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                var iLen = jqTds.length;
                for (var i = 0;  i < iLen-2; i++) {
                    // jqTds[i].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[i] + '">';
                }

                jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';

                jqTds[iLen-2].innerHTML = '<a class="edit" href="">Save</a>';
                jqTds[iLen-1].innerHTML = '<a class="cancel" href="">Cancel</a>';
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
                oTable.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 5, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
                oTable.fnDraw();
            }

            var oTable = $('#customer_editable_1').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 20,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records per page",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ]
            });

            var nEditing = null;



            $('#customer_editable_1 a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });

            $('#customer_editable_1 a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });

            // $('#customer_editable_1 a.edit').live('click', function (e) {
            //     e.preventDefault();
            //
            //     /* Get the row as a parent of the link that was clicked on */
            //     var nRow = $(this).parents('tr')[0];
            //     var jqTds = $('>td', nRow);
            //     var customer_id = jqTds[0].innerHTML;
            //     alert(customer_id);
            //     // $.get('/customer_edit/', {'customer_id':customer_id});
            //
            //     // $.ajax({
            //     //     type: "POST",
            //     //     url: "/customer_edit/",
            //     //     traditional:true,
            //     //     data: {customer_id:customer_id},
            //     //     dataType: 'json',
            //     //     success: function (data) {
            //     //         if (data.status == 'success') {
            //     //             alert("success");
            //     //         } else {
            //     //             alert("failed");
            //     //             return false;
            //     //         }
            //     //     },
            //     //     error: function (err) {
            //     //         alert("提交失败");
            //     //     }
            //     // });
            //
            //
            // });
        }

    };

}();
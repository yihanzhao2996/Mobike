$(document).ready(function(e) {
   
    // var data0 = [
    //     { field1: 'a1', field2: 'value a2', field3: 'value a3', field4: 'value a4' ,field5: 'value a1', field6: 'value a2'},
    //     { field1: 'a1', field2: 'value a2', field3: 'value a3', field4: 'value a4' ,field5: 'value a1', field6: 'value a2'},
    //     { field1: 'a1', field2: 'value a2', field3: 'value a3', field4: 'value a4' ,field5: 'value a1', field6: 'value a2'}
    //     ];

    // var data1 = [
    //     { 'field1': 'value a1', 'field2': 'value a2', 'field3': 'value a3', 'field4': 'value a4' ,'field5': 'value a1', 'field6': 'value a2'}
    //     ];
    
   
    

    function loadTable(tableId, fields, data) {
        var rows = '';
        $.each(data, function(index, item) {
            var row = '<tr>';
            $.each(fields, function(index, field) {
                row += '<td>' + item[field+''] + '</td>';
            });
            rows += row + '<tr>';
        });
        $('#' + tableId + ' tbody').html(rows);
    }

    
    var count = true;
    

    function getData(){
         // alert(count)
         $.ajax({
            url: '/tablePos',
            data: {num: count},
            type: 'POST',
            success: function(response) {
                
               data = JSON.parse(response)
               // alert(data);
               loadTable('data-table', ['field1', 'field2', 'field3','field4', 'field5', 'field6'], data);
               count = !count;
               // alert(count)

            },
            error: function(error) {
                // alert("fail");
            }
            
        });
        
        return false;
    }
  
    
    var refreshId = setInterval(getData, 2000);
    // getData();

    
    loadTable('data-table', ['field1', 'field2', 'field3','field4', 'field5', 'field6'], data1);
    
    // $('#btn-update').click(function(e) {
    //     loadTable('data-table', ['field1', 'field2', 'field3','field4', 'field5', 'field6','field7', 'field8', 'field9'], data1);
    // });
    
});
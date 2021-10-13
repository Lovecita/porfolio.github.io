$(document).ready(function(){
    //Function to reset values at init 
    function reset(){
        $("#numberDice").val("10");
        $("#numberRange").val("6");
        $("#numberTrials").val("10");
    }
    reset();    //Set initial values to all input fields
    

    //Validates input for non empty and valid data
    function validateInput(){
         
        var dice=$("#numberDice").val();        //Columns per table
        dice=parseInt(dice);
        var range=$("#numberRange").val();      //Max dice roll 
        range=parseInt(range);
        var trials=$("#numberTrials").val(); 
        trials=parseInt(trials);
 
        var errorValue=true;    //Defaulted to true (no error)
        //Validates dice number
        if(!dice){
            //Shows error, sets its message, and colors the error in red
            $('#errorDice').prop('hidden',false);   
            $('#errorDice').html('Missing data');
            $('#errorDice').css('color','red');
 
            errorValue= false;  //False means there was an error
        }else if(dice<parseInt($("#numberDice").attr('min')) || dice>parseInt($("#numberDice").attr('max'))){
            //Shows error, sets its message, and colors the error in red
            $('#errorDice').prop('hidden',false);   
            $('#errorDice').html('Invalid dice number: '+$("#numberDice").attr('min')+'-'+$("#numberDice").attr('max'));
            $('#errorDice').css('color','red');
 
            errorValue= false;  //False means there was an error
        }else{
            $('#errorDice').prop('hidden',true);    //Hide error message if not needed

        }

        //Validates range number
        if(!range){
            //Shows error, sets its message, and colors the error in red
            $('#errorRange').prop('hidden',false);   
            $('#errorRange').html('Missing data');
            $('#errorRange').css('color','red');
 
            errorValue= false;  //False means there was an error
        }else if(range<parseInt($("#numberRange").attr('min')) || range>parseInt($("#numberRange").attr('max'))){
            
            //Shows error, sets its message, and colors the error in red
            $('#errorRange').prop('hidden',false);   
            $('#errorRange').html('Invalid range number: '+$("#numberRange").attr('min')+'-'+$("#numberRange").attr('max'));
            $('#errorRange').css('color','red');
             
            errorValue= false;  //False means there was an error
        }else{
            $('#errorRange').prop('hidden',true);    //Hide error message if not needed

        }

         //Validates trials number
         if(!trials){
            //Shows error, sets its message, and colors the error in red
            $('#errorTrials').prop('hidden',false);   
            $('#errorTrials').html('Missing data');
            $('#errorTrials').css('color','red');
 
            errorValue= false;  //False means there was an error
        }else if(trials<parseInt($("#numberTrials").attr('min')) || trials>parseInt($("#numberTrials").attr('max'))){
            //Shows error, sets its message, and colors the error in red
            $('#errorTrials').prop('hidden',false);   
            $('#errorTrials').html('Invalid trials number: '+$("#numberTrials").attr('min')+'-'+$("#numberTrials").attr('max'));
            $('#errorTrials').css('color','red');
 
            errorValue= false;  //False means there was an error
        }else{
            $('#errorTrials').prop('hidden',true);    //Hide error message if not needed

        }
      
        return errorValue;    //Return results of either no error, or error/s caught
    }

    //Function creates array of arrays with random data, and index positions
    function createRandomArray(dice,range,trials){
        arrRandom=[];       //Creates empty list
       
        for (var i = 0; i < trials; i++) {
            var temp=[i+1];//Total columns dice+1
            
            //Loop per each column
            for (var j = 0; j < dice; j++) {
                var d1 = Math.floor(Math.random()*range) +1;        //Roll with a max possible of 1-range 
                temp.push(d1);  //Append data to array 
                
            }     
            arrRandom.push(temp);   //Append array to array of arrays
        }
        return arrRandom;   //Return array of arrays
    }

    //Roll dice
    $('#submit').click( function(){ 
        if(!validateInput()){
            $('#tableData').html('');  //Clear data
            return; //Skip submit if error occur
        }
        var dice=$("#numberDice").val();        //Columns per table
        dice=parseInt(dice);
        var range=$("#numberRange").val();      //Max dice roll 
        range=parseInt(range);
        var trials=$("#numberTrials").val();    //Number of rows
        trials=parseInt(trials);

        //Table will have id, dice1,dice1 etc...
        $('#tableData').html(''); //Clear data

        //Set table attrib
        $('#tableData').attr('data-role',"table");
        $('#tableData').attr('data-mode',"reflow");
        $('#tableData').attr('class',"ui-responsive");

        
        //Header data here
        var makeHeader="<thead><tr><th>id</th>";
        
        //Create header columns
        for (var i = 0; i < dice; i++) {
            makeHeader+="<th>die"+(i+1)+"</th>";    
            
        }
        makeHeader+="</tr></thead><tbody></tbody>";  
        $('#tableData').append(makeHeader); //Append data to html table
       
        //Array data (first column is id)
        var arrData=createRandomArray(dice,range,trials);   //Calls function to create array of arrays
               
        //Per each trial, get array data 
        for (var i = 0; i < trials; i++) {
            //Sets id
            var rowData="<td>"+arrData[i][0]+"</td>";  //Reset on each row to index +1 (position 1 to trials)
            //Per each dice/as many columns
            for (var j = 1; j < dice+1; j++) { 
                rowData+="<td>"+arrData[i][j]+"</td>";  //Append data to string
                
            } 
            
            //Add row data per each trials 
            $('#tableData tbody').append("<tr>"+rowData+"</tr>");
        }
         
        //Add some style to the table headers and column data
        $('#tableData thead th').css('color',"salmon");
        $('#tableData thead th').css('padding-left',"5px");
        $('#tableData thead th').css('padding-right',"5px");

        $('#tableData tbody td').css('color',"blue");
        $('#tableData tbody td').css('padding',"10px");
  
    });
});
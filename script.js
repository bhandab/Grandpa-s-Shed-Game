var numberItems;
var timeoutInterval;
var rememberItems;
var items =["#camera","#phone","#chair","#charger","#coins","#fan","#gloves","#hammer","#laptop","#multiplug","#oil","#papertowel","#pen","#pin","#sandal","#shoerack","#ball","#tshirt","#truck","#wood"];
var userItems = [];
var itemsRemoved = [];
$(document).ready(function (){
    
    
        inputValidate("submitButton","firstForm");
        submitForm(); 
    console.log(itemsRemoved);
        inputValidate("responseSubmit","secondForm");
        checkResponse();
});
 

var inputValidate = function(buttonID,formID){
    $("#"+buttonID).prop("disabled",true);
    $("#"+formID+" input:text").keyup(function(){
        var disable = false;
        $("#"+formID+" input:text").each(function(){
            if($(this).val()==""){
                 disable = true;      
            }
       });
    $("#"+buttonID).prop("disabled", disable);
    }); 
    
}

var submitForm = function(){
    $("#firstForm").submit(function(event){
        
        numberItems = parseInt($("#numberOfItems").val())
        timeoutInterval = parseInt($("#numberOfSeconds").val());
        rememberItems = parseInt($("#removeItems").val());
        console.log(numberItems);
        if(numberItems>=2 && numberItems<=20){
            $(".images").css("display","inline-block");
        
            showImages(numberItems,shuffle(items),userItems);
        
            $("#iForm").css("display","none");
            setTimeout(function(){
                displayBackground();
                setTimeout(function(){
                    hideBackground();
                    //inputValidate();
                    $("#answerForm").css("display","inline");
                    $("#responseSubmit").css("text-align","center");
                    hideImages(rememberItems,shuffle(userItems),itemsRemoved);
                    $("img").css("height","auto");
                    $("img").css("width","135px");
                },3000);
            },timeoutInterval*1000); 
        
        }
        else{
        alert("please enter number between and including 2 and 20");
        return;
        }
        event.preventDefault();
});
}

var showImages = function(itemNumbers,myItems,displayItems){
    for (var i = itemNumbers; i<myItems.length; i++){
        $(myItems[i]).css("display","none");
    }
    for (var i = 0; i<itemNumbers; i++){
            displayItems.push(myItems[i]);
    }
}

var hideImages = function(itemNumbers,myItems,removedItems){
    for (var i = 0; i<itemNumbers;i++){
        removedItems.push(myItems[i]);
        $(myItems[i]).css("display","none");
    }
}
var displayBackground = function(){
    $("body").animate({opacity:0}, function(){
            $("body").css("background",'url("door-locked.jpg") no-repeat');
            $("body").css("background-size", "cover");
        });
}
var hideBackground = function(){
    $("body").animate({opacity:1},function(){
        $("body").css('background-image', 'none');
    })
}
var shuffle = function(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
var checkResponse = function(){
    $("#secondForm").submit(function(event){
        var response = $("#userAnswer").val().split(",");
        var myString = itemsRemoved[0].substring(1);
        console.log(itemsRemoved);
        console.log(response);
        for (var i = 1; i<itemsRemoved.length; i++){
            myString+="," + itemsRemoved[i].substring(1); 
        }
        if(arraysEqual(itemsRemoved,response)){
            alert("Correct!");
        }
        else{
            alert("Incorrect!\nCorrect Answers: " + myString);
        }
        $("#answerForm").css("display","none");
        $("#buttons").css("display","block");
        $("#buttons").css("text-align","center");
        $("#resetButton").click(function(){
            location.reload();
        });
        event.preventDefault();
    });
    
}
var arraysEqual = function(_arr1, _arr2) {

    if ( _arr1.length !== _arr2.length){
        return false;
    }
      

    var arr1 = _arr1.concat().sort();
    console.log(arr1);
    var arr2 = _arr2.concat().sort();
    console.log(arr2);

    for (var i = 0; i < arr1.length; i++) {

        if (arr1[i].substring(1) !== arr2[i].toLowerCase()){
            return false;
        }
            

    }

    return true;

}




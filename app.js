//special thanks to this question which helped me fix a bug that almost made me quit project:
//https://stackoverflow.com/questions/8388106/png-rgb-transformation-related-to-alpha-in-getimagedata
//And also theese:
//https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
//https://stackoverflow.com/users/1548301/vicky-gonsalves

const original_canvas = document.getElementById('original_canvas');
const edited_canvas = document.getElementById('edited_canvas');
const orig_ctx = original_canvas.getContext('2d');
const edit_ctx = edited_canvas.getContext('2d');
var start = document.getElementById("start");
var textfield = document.getElementById("floatingTextarea2");
var message = "";
var download = document.getElementById("download");



var loadFile = function(event){                                     
    var uploaded_image = new Image();
    let original_image_element = document.getElementById("original_image_element");       //uploaded and result image will be shown in image element
    uploaded_image.src = URL.createObjectURL(event.target.files[0]);                      //while the canvases will be hidden because if they were scaled it would destroy the message
    original_image_element.src = uploaded_image.src;                                      //thus only image elements will be scaled
    uploaded_image.onload = function (){
        let client_width = $(document).width();
        let client_height = $(document).height();
        original_canvas.width = uploaded_image.width;
        original_canvas.height = uploaded_image.height;
        orig_ctx.drawImage(uploaded_image,0,0);
    };
};


function toBinary(input){                               //converts text to binary
    var output = "5";
    for(i = 0; i < input.length; i++){
        output += input[i].charCodeAt(0).toString(2) + "2"; //first to ASCI code then to binary
    }
    output += "5";
    return output
}


function toText(input){                                 //converts binary to text
    var output = "";
    var binary = "";
    for(i = 0; i < input.length; i++){
        if(input[i] == "2"){                                //divides string by spaces
            asci = parseInt(binary, 2);                       //binary to ASCI code
            output += String.fromCharCode(asci);              //ASCI code to char
            binary = "";
        }
        else{
            binary += input[i];
        }
    }
    return output;
}


function closest_point(number, change){                 //finds number ending in 1 or 0 and changes it to it
    var result = 0;                                       //this should help reduce the vissible changes
    function up(){
        result = (((number-number%10)/10)+1)*10+change;
        return result;
    }
    function down(){
        result = number-number%10+change;
        return result;
    }
    if(Math.abs(number-up()) < Math.abs(number-down()) && up()<255){
        return up();
    }
    else{
        return down();
    }
}


function encode(){
    message = toBinary(textfield.value);
    let imgData = orig_ctx.getImageData(0, 0, original_canvas.width,original_canvas.height);
    if(message.length > imgData.data.length){
        alert("Message is too big.");
    }
    else{
        var a = 0;
        for (i = 0; i < imgData.data.length; i += 3){
            if(i >= message.length){
                break;
            }
            else{
                imgData.data[a] = closest_point(imgData.data[a],Number(message[i]));        
                imgData.data[a+1] = closest_point(imgData.data[a+1],Number(message[i+1]));        
                imgData.data[a+2] = closest_point(imgData.data[a+2],Number(message[i+2]));        
                a += 4;
            }       
        }
        edited_canvas.width = imgData.width;
        edited_canvas.height = imgData.height;
        edit_ctx.putImageData(imgData, 0, 0);
        var jpg = edited_canvas.toDataURL('image/png', 1.0);
        let edited_image_element = document.getElementById("edited_image_element");
        download.href = jpg;
        edited_image_element.src = jpg;
    }
}


function decode(){
    message_paragraph = document.getElementById("message_paragraph");
    message="";
    counter = 0;
    let imgData = orig_ctx.getImageData(0, 0, original_canvas.width,original_canvas.height);
    for(i=0; i < imgData.data.length;i+=4){
        if(imgData.data[i]%10 == 5){
            counter += 1;
        }
        if(counter == 1){
            message += (imgData.data[i]%10).toString();
            message += (imgData.data[i+1]%10).toString();
            message += (imgData.data[i+2]%10).toString();
        }
        if(counter == 2){
            message = message.substring(1);
            if(message.includes("5")==true){
                message = message.substring(0,message.indexOf('5'));
            }
        break;
        }
    }
    message_paragraph.innerHTML = toText(message);
}


var encode_check = document.getElementById("encode_check");
var decode_check = document.getElementById("decode_check");
var encryption_check = document.getElementById("encryption_check");
var password_check = document.getElementById("password_check");

function main(){                            //main function that checks if everything is filled and then calls either encode or decode funcions
if(decode_check.checked == true){
    decode();
}
else{
    if(encode_check.checked == true){
        encode();
    }
    else{
        alert("Fill everyhing");
    }
}
}



$('#encode_div').hide();
$('#password_div').hide();
$('#decode_div').hide();
$(original_canvas).hide();
$(edited_canvas).hide();

function change(){                            //simple function that hides or shows elements based on checks
if(decode_check.checked == true){
    $('#encode_div').hide();
    $('#decode_div').show();
}
else{
    $('#decode_div').hide();
    if(encode_check.checked == true){
        $('#encode_div').show();
        if(password_check.checked == true){
            $('#password_div').show();
        }
        else{$('#password_div').hide();}
    }
    else{$('#encode_div').hide();}
}
}

document.getElementById("checks").addEventListener("click",change);
/**
 This function initialize a object Message
 @param{string} _file the file for read data
 @param{string} _color the color for the change
 @param{string} _id the id of the object going to change
 */
function Message(_file, _color, _id){
    this.file = _file;
    this.color = _color;
    this.id = _id;
}

/**
 This function set the text and color of html objects based on properties in Message object
 @param{number} _time the time for the timeout call
 */
Message.prototype.set = function(_time){
    /**
     This function call the ajax to extract data from given file and set the data and property for html object
     @param{string} file the file for read data
     @param{string} color the color for the change
     @param{string} id the id of the object going to change
    */
    function set_text(file, color, id){
        $.ajax({
            url: file,
            dataType: "text",
            success: function (data) {
                $("#"+id).html(data);
            }
        });
        $('#'+id).css('color',color);
    }

    let self = this;
    setTimeout(function(){ set_text(self.file, self.color, self.id);}, _time);
};

/**
This function is to be called by html onclick, and it initialzes a Message and call the set function.
 */
function change(){
    $( function(){
        let greeting = new Message("file.txt", "red", "first_heading");
        const ten_sec = 10*1000;
        greeting.set(ten_sec);
    });
}
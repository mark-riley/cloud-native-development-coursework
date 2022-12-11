//The URIs of the REST endpoint
IUPS = "https://prod-54.eastus.logic.azure.com:443/workflows/9e6a40f515904c7eb0470182f770af78/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5u1Y78lSh261nJzBUR8X2z8X2KyA1qmjp3FQqyGak_w";
RAI = "https://prod-15.centralus.logic.azure.com:443/workflows/8d4cde56cb1e4b5bb5bff3224beb06f2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ss--x53tDC0t3EN_2iKCrug2LymD2zc7d0y2sJo_-Mk";

BLOB_ACCOUNT = "https://blobstoragecom682mr.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  });

  $("#standardLogin").click(function(){

    //Execute the standard login function
    standardLogin();

  });

});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
    //Create a form data object
    submitData = new FormData();
    //Get form variables and append them to the form data object
    submitData.append('FileName', $('#FileName').val());
    submitData.append('userID', $('#userID').val());
    submitData.append('userName', $('#userName').val());
    submitData.append('File', $("#UpFile")[0].files[0]);

    //Post the form data to the endpoint, note the need to set the content type header
    $.ajax({
        url: IUPS,
        data: submitData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
            
        }
    });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){
    
    //Replace the current HTML in that div with a loading message
    $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    $.getJSON(RAI, function( data ) {
        //Create an array to hold all the retrieved assets
        var items = [];

        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each( data, function( key, val ) {
        items.push( "<hr />");
        //items.push("<img src='"+BLOB_ACCOUNT + val["filepath"] +"' width='400'/> <br />")
        items.push( "<video width='320' height='240' controls><source src='"+BLOB_ACCOUNT + val["filepath"] +"' type='video/mp4'></video><br />");
        items.push( "File : " + val["fileName"] + "<br />");
        items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+")<br />");
        items.push( "<hr />");
        });
        //Clear the assetlist div
        $('#VideoList').empty();
        //Append the contents of the items array to the VideoList Div
        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "#VideoList" );
    });
 
}

function standardLogin(){

    window.prompt("Username", "Login");
}
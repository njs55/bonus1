// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

//for test commit

(function() {
	// Magic!
	console.log('Keepin\'n it clean with an external script!');
   // first bind the new character event to a function
   items = null;
   $.get({
      url: "http://www.mattbowytz.com/simple_api.json",
      data: {
         "data": "all"
      },
      success: function(data) {
         console.log("data: " + data);
         items = data.data;
         console.log("items: " + items);
         if (items.constructor === Object){
            items = $.merge(data.data.interests,data.data.programming);
            console.log("items2: " + items);
         }
            
      }
   });
   console.log("OG items: " + items);
   var input = jQuery('#search-id');
   var displayItems = " ";   
   var testing = jQuery('#test');
   var display = document.getElementById("test");
   console.log("input: " + input);
   input.on('keyup', function(){
      displayItems = " ";
      var query = input.val();
      for (i = 0; i < items.length; i++) {
         var item = items[i].toLowerCase();
         if (item.indexOf(query) === 0) {
            console.log("new item: " + item);
            console.log("query: " + query);
            if (query != ""){
               displayItems = displayItems + item + "<br />";
            }
            //testing.show( "fold", 1000 );
            //item.show();
         }
      }
      console.log("array: " + displayItems);
      //$('#test').append(displayItems);
      if(display){
         display.innerHTML = displayItems;
      }
   });
   //var input = document.getElementById('search-id');
   //input.addEventListener('keyup',keyStroke());
   
   
   
   // this function then creates a HTTPRequest with data=<contents of dropdown>, text=<contents of input box>
   // receive JSONresponse, 
})();

function keyStroke(){
   console.log('fsdf');
}


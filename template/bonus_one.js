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
   var topic = jQuery('#select-id');
   var input = jQuery('#search-id');
   var dataTopic;
   var displayItems = "";
   var display = document.getElementById("display-id");
   
   //call get function
   get();
   
   //update items being searched for when a topic is selected
   //calls the get() function
   topic.change(function(){get()});
   
   //console.log("input: " + input);
   input.on('keyup', function(){
      displayItems = "";
      var query = input.val();
      for (i = 0; i < items.length; i++) {
         var item = items[i].toLowerCase();
         if (item.indexOf(query) === 0) {
            //console.log("new item: " + item);
            //console.log("query: " + query);
            if (query != ""){
               displayItems = displayItems + item + "<br />";
            }
         }
      }
      //update contents in div on html page
      if(display){
         display.innerHTML = displayItems;
      }
   });
   
   // this function then creates a HTTPRequest with data=<contents of dropdown>, text=<contents of input box>
   // receive JSONresponse, 
})();

/**
 * calls $.get()
 * no params
 * no return
 */
function get(){
   var topic = jQuery('#select-id');
   $.get({
      url: "http://www.mattbowytz.com/simple_api.json",
      data: {
         "data": topic.val()
      },
      success: function(data) {
         //console.log("data: " + data);
         items = data.data;
         //console.log("items: " + items);
         if (items.constructor === Object){
            //merge both programming and interest Objects
            items = $.merge(data.data.interests, data.data.programming);
            //console.log("items2: " + items);
         }
            
      }
   });
}



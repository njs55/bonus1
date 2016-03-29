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
   // global variable holding our API response data
   data = {}
   // elements to which we bind our events
   var select = jQuery('#select-id');
   var input = jQuery('#search-id');
   var list = jQuery('#filtered-list');
   // bind input text change to function filtering list
   input.on('keyup', function(){
      var query = input.val();
      list.empty();
      // iterate over all of the topics in the dataset
      for (var topic in data) {
         var items = data[topic];
         var filtered = [];
         // iterate over all of the items in the topic
         for (var i = 0; i < items.length; i++) {
            var item = items[i].toLowerCase();
            // check to see if the query is a prefix of the item
            if (item.indexOf(query) === 0) {
               filtered.push('<li><a href="http://google.com/?gws_rd=ssl#q=' + item + '">' + item + '</li>');
            }
         }
         // if there are any hits from this topic, let's print them
         if (filtered.length > 0) {
            list.append('<strong>' + topic + '</strong>');
            var ul = jQuery('<ul></ul>');
            ul.append(filtered.sort());
            list.append(ul);
         }
      }
      // if there are no hits in any topic, display a message
      if (list.is(':empty')) {
         list.append('<strong>No results.</strong>');
      }
   });
   // bind topic select change to function fetching API data
   select.on('change', function() {
      topic = select.val();
      $.ajax({
         url: 'http://www.mattbowytz.com/simple_api.json',
         data: {
            'data': topic
         },
         success: function(response) {
            // set the data using the response data
            if (topic === 'all') {
               data = response.data;
            } else {
               data = {}
               data[topic] = response.data;
            }
            // trigger an event on the input box to render unfiltered list
            $('#search-id').trigger('keyup');
         }
      });
   });
   // trigger the change event at load up to fetch the default data
   select.trigger('change');
})();



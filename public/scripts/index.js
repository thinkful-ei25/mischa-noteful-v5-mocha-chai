<<<<<<< HEAD
/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  api.search({}, response => {
    store.notes = response;
    noteful.render();
  });

});
||||||| merged common ancestors
=======
/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  api.search({})
    .then(response => {
      store.notes = response;
      noteful.render();
    });

});
>>>>>>> solution/04-promises

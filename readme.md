Holla,  
This is actually just a mix of two examples from todo-mvc official repo:
 
 - [angular-perf](https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/angularjs-perf)  for performance optimization 
 - [firebase-angular](https://github.com/tastejs/todomvc/tree/gh-pages/labs/architecture-examples/firebase-angular) for firebase
 
 Nothing special, but at least I made it work together in the latest versions of angular and angularfire :)
 
 Haven't added Bootstrap here, as it would be overkill for a such small app, it really good for larger application with 
  a lot of form elements and pages and other UI blocks.
   
 Also haven't added any gulp scripts here, just becase there is no scss to compile and only 5 js files that I just included in index.html directly.
 Usually we use gulp for large projects to optimize/prebuild files.
 For example recently we switched our app to a modular structure acceding to [the Angular style guide](https://github.com/mgechev/angularjs-style-guide)
 Gulp combines all modules into one in correct order and also adds sourcemaps, this is really cool as we don't need to add new script 
 tags on the page each time we add new files + it also makes dev environment work the same as production, which is also important to us.
 
 I'm writing this just to let you know that I'm also huge fan of Gulp and other modern tools like Bootsrap and Compass for example.
 For this small demo I decided not use them as it would be overkill. But if you want more examples, just let me know.
 
 #  How to run     
 - run bower install 
 - open index.html in Chrome or if you have http-server installed (npm install http-server) run http-server -o in terminal
 
 
 
 
 

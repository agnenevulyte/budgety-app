// writing a module with a module pattern

/*
Everything starts counting from the outer function (publicTest)
where we pass the value in console - budgetController.publicTest(5).
Then it goes to the add function with that argument (5 in this case)
and returns the answer to add function, which returns it to publicTest function
and console.logs it
*/
var budgetController = (function() { // function which is immediately invoked is called iffy

    var x = 23;
    var add = function(a) { // inside scope can't be reached by public. Private add function
        return x + a;
    }

    var minus = function(a) { // inside scope can't be reached by public. Private add function
        return x - a;
    }

    
    return { // returns an object
        // publicTest always will have an access to x and add, because a closure was created
        // publicTest is public because it was returned and now we can use it
        // but x and add are private because they are in the closure and only publicTest can access it
        publicTest: function(b) { // outside scope
            console.log(add(b));
        },
        publicMinus: function(c) {
            console.log(minus(c));
        }
    }
    
    /*
    return [  // returns an array
        // always will have an access to x, and add, and minus, because a closure was created
        // called budgetController[0](8);
        function(b) { // outside scope
            console.log(add(b));
        },
        // called budgetController[1](8);
        function(c) {
            console.log(minus(c));
        }
    ];
    */


})(); // () imediately invokes/calls the function

/* it works because of closures which let's inner function to access the var and parameters
to the outer function even when the outer function has returned. */




// Creating another module with the user interface
// Those two modules will never be related and won't affect each other as they are working independently
 
var UIController = (function() {

    // some code

})();



// app controller to let two previous modules to communicate

var controller = (function(budgetCtrl, UICtrl){

    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublic: function() {
            console.log(z);
        }
    }

})(budgetController, UIController);
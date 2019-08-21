// this module controls budget data
var budgetController = (function() {
   // some code
   
    // var x =23;
    // var add = function(a) {
    //     return x + a;
    // }
    
    // // exposed to the public, because the closure was created here
    // return {
    //     publicTest: function(b) {
    //         return add(b);
    //     }
    // }

})();
// -----------------------------------------------------




// UI Controller
var UIController = (function(){

    return {
        getInput: function() {
            return {
                // 1. get the field input data
                type: document.querySelector(".add__type").value, // will be either inc ot exp
                addedItem: document.querySelector(".add__description").value,
                amountSpent: document.querySelector(".add__value").value
            }
        }
    };

})();
// -----------------------------------------------------




// connects budgetController & UIController
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function() {
        // 1. get the field input data
        var input = UICtrl.getInput();
        console.log(input)
        // 2. add the item to the budget controller
        // 3. add the new item to the UI
        // 4. calculate the budget
        // 5. display the budget on UI 
    }

    document.querySelector(".add__btn").addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13) { // 13 is enter
            ctrlAddItem();
        }
    })
    
// some code

})(budgetController, UIController);
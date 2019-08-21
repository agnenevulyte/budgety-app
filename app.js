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

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription:  ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn"

    }

    return {
        getInput: function() {
            return {
                // 1. get the field input data
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc ot exp
                inputDescription: document.querySelector(DOMstrings.inputDescription).value,
                inputValue: document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();
// -----------------------------------------------------




// connects budgetController & UIController
var controller = (function(budgetCtrl, UICtrl){

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function() {
        // 1. get the field input data
        var input = UICtrl.getInput();
        console.log(input)
        // 2. add the item to the budget controller
        // 3. add the new item to the UI
        // 4. calculate the budget
        // 5. display the budget on UI 
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13) { // 13 is enter
            ctrlAddItem();
        }
    })
    
// some code

})(budgetController, UIController);
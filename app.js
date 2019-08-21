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

    // function constructors starts with capital letter
    // Expense contructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // Income constuctor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            icn: 0
        }
    }

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

    var setupEventListeners =  function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) { // 13 is enter
                ctrlAddItem();
            }
        })
    }


    var ctrlAddItem = function() {
        // 1. get the field input data
        var input = UICtrl.getInput();
        console.log(input)
        // 2. add the item to the budget controller
        // 3. add the new item to the UI
        // 4. calculate the budget
        // 5. display the budget on UI 
    }

    return {
        init: function() {
            setupEventListeners();
        }
    }

})(budgetController, UIController);

// public initialization function INIT
controller.init();

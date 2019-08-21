// this module controls budget data
var budgetController = (function() {
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
            expense: [],
            income: []
        },
        total: {
            income: 0,
            expense: 0
        }
    }

    // adding a new item
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // console.log(data)
            if (data.allItems[type].length > 0) {
                // ID = last ID+1
                // console.log("1   " , data.allItems)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create the new item based on "exp" or "inc" type
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            // Return the new element
            // console.log("after  " , data)
            return newItem;

        },
        // testing: function() {
        //     console.log("data   " ,data)
        // }
    };

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
        var input, newItem;
        // 1. get the field input data
        input = UICtrl.getInput();
        console.log("input   ",input)
        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
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

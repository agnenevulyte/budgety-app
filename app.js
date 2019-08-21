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
            if (data.allItems[type].length > 0) {
                // ID = last ID+1
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create the new item based on "expenses" or "income" type
            if (type === "expense") {
                newItem = new Expense(ID, des, val);
            } else if (type === "income") {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            // Return the new element
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
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list"
    }

    return {
        getInput: function() {
            return {
                // 1. get the field input data
                type: document.querySelector(DOMstrings.inputType).value, // will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        // Adding the new code to the UI
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create html string with placeholder text
            if (type === 'income') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'expense') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }                        

            // Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            console.log(newHtml);

            // insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

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
        console.log("newItem-----------" , newItem);
        // 3. add the new item to the UI
        var addListItem = UICtrl.addListItem(newItem, input.type);
        console.log("addListItem-----------" , addListItem);
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

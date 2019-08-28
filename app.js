// this module controls budget data
var budgetController = (function() {
    // function constructors starts with capital letter
    // Expense contructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage =  function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage =  function() {
        return this.percentage;
    }

    // Income constuctor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
       data.total[type] = sum;
    };

    var data = {
        allItems: {
            expense: [],
            income: []
        },
        total: {
            income: 0,
            expense: 0
        },
        budget: 0,
        percentage: -1
       
    };
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
        
        deleteItem: function(type, id) {
            var ids, index;
            // id = 6
            // data.allItems[type][id];
            // ids = [1 2 4 6 8]
            // index 3
            
            // map returns a brand new array
            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculatedBudget: function() {
            // calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');
            // calculate the budget: income - expenses
            data.budget = data.total.income - data.total.expense;
            console.log("data.budget---", data.budget);
            // calculate the % of income that we spent
            if (data.total.income > 0) {
                data.percentage = Math.round((data.total.expense / data.total.income) * 100);
            } else {
                data.percentage = -1;
            }
            console.log("percentage----" , data.percentage);
        },

        calculatePercentages: function() {
            /*
            a =20
            b=10
            c=40
            income 100
            a = 20/100=20%
            b = 10/100 = 10%
            c = 40/100 = 40%
            */
            data.allItems.expense.forEach(function(current){
                current.calcPercentage(data.total.income);
            });
        },

        getPercentages: function() {
            var allPercentages =  data.allItems.expense.map(function(current){
                return current.getPercentage();
            });
            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.total.income,
                totalExp: data.total.expense,
                percentage: data.percentage
            }
        },

        testing: function() {
            console.log("data   " ,data)
        }
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
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLable: ".budget__income--value",
        expensesLable: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type) {
        var numSplit, int, dec;
        /*
        + or - before the number
        2 decimal points
        comma separating the thousands
        3,2445.12
        */
       num = Math.abs(num);
       num = num.toFixed(2);

       numSplit = num.split('.');
       int = numSplit[0];

       if (int.length > 3) {
            int = int.substr(0, int.length - 3 ) + ',' + int.substr(int.length - 3, 3);
       }
       dec = numSplit[1];

       return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    var nodeListForEach = function(list, callback) {
        for (var i=0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                // 1. get the field input data
                type: document.querySelector(DOMstrings.inputType).value, // will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            console.log(newHtml);

            // insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        // clear input fields
        clearFields: function() {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current) {
                current.value = "";
            });

            // focus back on the first input field
            fieldsArray[0].focus();
        },
        
        displayBudget: function(obj) {
            var type;

            obj.budget > 0 ? type = 'income' : type = 'expense';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLable).textContent = formatNumber(obj.totalInc, 'income');
            document.querySelector(DOMstrings.expensesLable).textContent = formatNumber(obj.totalExp, 'expense');
            if (obj.percentage > 0 ) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

        },

        displayMonth: function() {
            var now, months, year, month;
            now = new Date();
            year = now.getFullYear();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).innerHTML = months[month] + ' ' + year;
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
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
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    var updateBudget =  function(){
        // 5. calculate the budget
        budgetCtrl.calculatedBudget();
        // 6. return the budget
        var budget = budgetCtrl.getBudget();
        // 7. display the budget on UI 
        UICtrl.displayBudget(budget);
    };

    var updatePercentages =  function(){
        // 1. calculate the %
        budgetCtrl.calculatePercentages();
        // 2. read % from the budget controller
        var percentages = budgetCtrl.getPercentages()
        // 3. update UI
        UICtrl.displayPercentages(percentages);
    };


    var ctrlAddItem = function() {
        var input, newItem;
        // 1. get the field input data
        input = UICtrl.getInput();
        console.log("input   ",input);

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. add the new item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 8. calculate and update budget
            updateBudget();
            // 9. calculate and update %
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemId, splitID, type, ID, IDnumber;
        // event delegation, bubbling 
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            splitID = itemId.split('-');
            type = splitID[0];
            ID = splitID[1];
            IDnumber = parseInt(ID);

            // 1. delete item from the datat structure
            budgetController.deleteItem(type, IDnumber);
            // 2. delete item from the UI
            UICtrl.deleteListItem(itemId);
            // 3. update and show the new budget
            updateBudget();
            // 4. calculate and update %
            updatePercentages();
        }

        
    };


    return {
        init: function() {
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

// public initialization function INIT
controller.init();

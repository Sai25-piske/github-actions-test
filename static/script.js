let currentNumber = "";
let previousNumber = "";
let operator = null;


function addNumber(number) {

	    if (number === "." && currentNumber.includes(".")) {
		            return;
		        }

	    currentNumber += number;

	    updateDisplay();
}


function chooseOperator(selectedOperator) {

	    if (currentNumber === "") {
		            return;
		        }

	    previousNumber = currentNumber;

	    currentNumber = "";

	    operator = selectedOperator;
}


function calculate() {

	    if (
		            previousNumber === "" ||
		            currentNumber === "" ||
		            operator === null
		        ) {
		            return;
		        }

	    fetch("/calculate", {

		            method: "POST",

		            headers: {
				                "Content-Type": "application/json"
				            },

		            body: JSON.stringify({

				                num1: previousNumber,

				                num2: currentNumber,

				                operator: operator

				            })

		        })

	    .then(response => response.json())

	    .then(data => {

		            if (data.error) {

				                alert(data.error);

				                clearDisplay();

				                return;
				            }

		            currentNumber = String(data.result);

		            previousNumber = "";

		            operator = null;

		            updateDisplay();

		        })

	    .catch(error => {

		            console.error(error);

		            alert("Something went wrong.");

		        });
}


function clearDisplay() {

	    currentNumber = "";

	    previousNumber = "";

	    operator = null;

	    updateDisplay();
}


function deleteLast() {

	    currentNumber = currentNumber.slice(0, -1);

	    updateDisplay();
}


function updateDisplay() {

	    const display = document.getElementById("display");

	    display.value = currentNumber || "0";

	    updateRecommendation();
}


function updateRecommendation() {

	    const value = Number(currentNumber);

	    if (currentNumber === "" || Number.isNaN(value)) {
		            showDrink("beer");
		            return;
	        }

	    showDrink(value >= 500 ? "whiskey" : "beer");
}


function showDrink(drink) {

	    const recommendation = document.getElementById("drinkRecommendation");
	    const drinkName = document.getElementById("drinkName");
	    const drinkMessage = document.getElementById("drinkMessage");
	    const drinkImage = document.getElementById("drinkImage");
	    const isWhiskey = drink === "whiskey";

	    recommendation.classList.toggle("whiskey-recommendation", isWhiskey);
	    drinkImage.className = `drink-image ${isWhiskey ? "whiskey-image" : "beer-image"}`;
	    drinkImage.textContent = isWhiskey ? "🥃" : "🍺";
	    drinkName.textContent = isWhiskey ? "Whiskey" : "Beer";
	    drinkMessage.textContent = isWhiskey
	        ? "500 and above gets a whiskey."
	        : "Numbers below 500 get a beer.";
}

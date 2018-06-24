import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.scss"]
})
export class CalculatorComponent implements OnInit {
  constructor(private myRoute:Router) {}

  GETtransaction():void{
    this.myRoute.navigateByUrl('/Print');
  }

  ngOnInit() {
    // Get all the keys from document
    var Keys = document.querySelectorAll("#calculator span");
    var Operators = ["+", "-", "x", "÷"];
    var decimalAdded = false;

    var arrObj: Array<object> = [];

    // Add onclick event to all the keys and perform operations
    for (var i = 0; i < Keys.length; i++) {
      Keys[i].addEventListener("click", function(e) {
        // Get the screenInput and button values
        var InputScreen = document.querySelector(".screen");
        var InputScreenVal = InputScreen.innerHTML;
        var btnVal = this.innerHTML;

        // If clear key is pressed, erase everything
        if (btnVal == "CLR") {
          InputScreen.innerHTML = "";
          decimalAdded = false;
        }
        // If eval key is pressed, calculate and display the result
        else if (btnVal == "=") {
          arrObj = JSON.parse(localStorage.getItem("HistoryArr"));
          var oneCalc = {
            equation: "",
            result: ""
          };
          var equation = InputScreen.innerHTML;
          var lastChar = equation[equation.length - 1];
          oneCalc.equation = equation;
          console.log(equation);

          // Replace all x and ÷ with * and / respectively.
          equation = equation.replace(/x/g, "*").replace(/÷/g, "/");

          // Checking the last character of the equation. If it's an operator or a decimal, remove it
          if (Operators.indexOf(lastChar) > -1 || lastChar == ".")
            equation = equation.replace(/.$/, "");

          if (equation)
          InputScreen.innerHTML = eval(equation);
          oneCalc.result = InputScreen.innerHTML;
          
          //see output of object
          console.log(oneCalc);
          arrObj.push(oneCalc);
          localStorage.setItem("HistoryArr",JSON.stringify(arrObj));
          //see output of array of all transactions
          console.log(arrObj);
          decimalAdded = false;
        } 
        else if (Operators.indexOf(btnVal) > -1) {
          // Operator is clicked
          // Get the last character from the equation
          var lastChar =
            InputScreen.innerHTML[InputScreen.innerHTML.length - 1];
          // 1. No two operators should be added consecutively.
          // Only add operator if input is not empty and there is no operator at the last
          if (InputScreen.innerHTML != "" && Operators.indexOf(lastChar) == -1)
            InputScreen.innerHTML += btnVal;
          // 2. The equation shouldn't start from an operator except minus
          // Allow minus if the string is empty
          else if (InputScreen.innerHTML == "" && btnVal == "-")
            InputScreen.innerHTML += btnVal;

          // Replace the last operator (if exists) with the newly pressed operator
          if (
            Operators.indexOf(lastChar) > -1 &&
            InputScreen.innerHTML.length > 1
          ) {
            InputScreen.innerHTML = InputScreen.innerHTML.replace(/.$/, btnVal);
          }

          decimalAdded = false;
        }

        // 3. not more than 1 decimal should be there in a number
        else if (btnVal == ".") {
          if (!decimalAdded) {
            InputScreen.innerHTML += btnVal;
            decimalAdded = true;
          }
        }
        // if any other key is pressed, just append it
        else {
          InputScreen.innerHTML += btnVal;
        }
      });
    }
  }
}

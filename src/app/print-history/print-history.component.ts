import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-print-history",
  templateUrl: "./print-history.component.html",
  styleUrls: ["./print-history.component.scss"]
})
export class PrintHistoryComponent implements OnInit {
  constructor(private myRoute: Router) {}

  AllTransaction: Array<object>;
  BackToCalc(): void {
    this.myRoute.navigateByUrl("");
  }

  ngOnInit() {
    this.AllTransaction = JSON.parse(localStorage.getItem("HistoryArr"));
    if (this.AllTransaction != []) 
    console.log(this.AllTransaction);
  }
}

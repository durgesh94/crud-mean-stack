import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { NotifierService } from "angular-notifier";
import { ApiResponse } from "../_utilities//constant/Api-Response";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit {
  contactList = [];
  apiResponse: ApiResponse;

  constructor(
    private appService: AppService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.appService.getContactList().subscribe(result => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.contactList = this.apiResponse.data;
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }

  onDelete(id) {
    this.appService.deleteContact(id).subscribe(result => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.notifierService.notify("success", this.apiResponse.message);
        this.getData();
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }
}

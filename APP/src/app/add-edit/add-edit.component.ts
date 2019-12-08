import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../app.service";
import { NotifierService } from "angular-notifier";
import { ApiResponse } from "../_utilities//constant/Api-Response";

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"]
})
export class AddEditComponent implements OnInit {
  id: any;
  addForm: FormGroup;
  submitted = false;
  data: any;
  isUpdate: boolean = false;
  apiResponse: ApiResponse;
  btnName = "Create";

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private notifierService: NotifierService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.route.params.subscribe(params => (this.id = params.id));
  }

  ngOnInit() {
    this.formInit();
    this.id == "0" ? null : this.getData();
  }

  formInit() {
    this.addForm = this.formBuilder.group({
      name: ["", Validators.required],
      gender: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  getData() {
    this.isUpdate = true;
    this.btnName = "Update";
    this.appService.getContact(this.id).subscribe(result => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.data = this.apiResponse.data;
        this.addForm.patchValue({
          name: this.data.name,
          gender: this.data.gender,
          email: this.data.email,
          phone: this.data.phone
        });
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) return;
    this.isUpdate ? this.onUpdate() : this.onCreate();
  }

  onUpdate() {
    this.appService
      .updateContact(this.id, this.addForm.value)
      .subscribe(result => {
        this.apiResponse = result as ApiResponse;
        if (this.apiResponse.status) {
          this.notifierService.notify("success", this.apiResponse.message);
          setTimeout(() => {
            this.router.navigate(["/view"]);
          }, 3000);
        } else {
          this.notifierService.notify("error", this.apiResponse.message);
        }
      });
  }

  onCreate() {
    this.appService.createContact(this.addForm.value).subscribe(result => {
      this.apiResponse = result as ApiResponse;
      if (this.apiResponse.status) {
        this.notifierService.notify("success", this.apiResponse.message);
        setTimeout(() => {
          this.router.navigate(["/view"]);
        }, 3000);
      } else {
        this.notifierService.notify("error", this.apiResponse.message);
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }
}

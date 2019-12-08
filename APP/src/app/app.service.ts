import { Injectable } from "@angular/core";
import { RequestApi, httpOptions } from "./_utilities/constant/Api-Constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}

  getContactList() {
    return this.http.get(RequestApi.GET_CONTACT_LIST, httpOptions);
  }

  getContact(id: any) {
    return this.http.get(RequestApi.GET_CONTACT_BYID + id, httpOptions);
  }

  createContact(data: any) {
    return this.http.post(RequestApi.POST_CONTACT_DATA, data, httpOptions);
  }

  updateContact(id: any, data: any) {
    return this.http.put(
      RequestApi.UPDATE_CONTACT_BYID + id,
      data,
      httpOptions
    );
  }

  deleteContact(id: any) {
    return this.http.delete(RequestApi.DELETE_CONTACT_BYID + id, httpOptions);
  }
}

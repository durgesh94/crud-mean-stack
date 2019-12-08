import { HttpHeaders } from "@angular/common/http";

export const GlobalVariable = Object.freeze({
  /* Local Environment */
  BASE_API_URL: "http://localhost:3000/"

  /* Development Environment Local */
  // BASE_API_URL: ''

  /* UAT Environment - Varahi Cloud */
  // BASE_API_URL: ''
});

export const RequestApi = Object.freeze({
  GET_CONTACT_LIST: GlobalVariable.BASE_API_URL + "contacts",
  GET_CONTACT_BYID: GlobalVariable.BASE_API_URL + "contacts/",
  POST_CONTACT_DATA: GlobalVariable.BASE_API_URL + "contacts",
  UPDATE_CONTACT_BYID: GlobalVariable.BASE_API_URL + "contacts/",
  DELETE_CONTACT_BYID: GlobalVariable.BASE_API_URL + "contacts/"
});

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

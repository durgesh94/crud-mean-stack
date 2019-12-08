module.exports = app => {
  const contacts = require("../controllers/contact.controller.js");

  // Create a new Contact - POST Request
  app.post("/contacts", contacts.create);

  // Retrieve all Contacts - GET Request
  app.get("/contacts", contacts.findAll);

  // Retrieve a single Contact with contactId - GET Request with Param
  app.get("/contacts/:contactId", contacts.findOne);

  // Update a Contact with contactId - PUT Request with Param
  app.put("/contacts/:contactId", contacts.update);

  // Update a Contact with contactId - PATCH Request with Param
  app.patch("/contacts/:contactId", contacts.update);

  // Delete a Contact with contactId - DELETE Request with Param
  app.delete("/contacts/:contactId", contacts.delete);
};

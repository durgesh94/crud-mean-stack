const Contact = require("../models/contact.model.js");
const handler = require("../../handlers/response.handler.js");

//** Create and Save a new Contact */
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return handler.error(
      { code: 400, message: "Contact content can not be empty." },
      res
    );
  }
  // Create a Contact
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
    create_date: req.body.create_date
  });
  // Save Contact in the database
  contact
    .save()
    .then(data => {
      res.message = "New contact created.";
      return handler.success(res, data);
    })
    .catch(err => {
      err.code = 500;
      return handler.error(err, res);
    });
};

//** Retrieve and return all contacts from the database. */
exports.findAll = (req, res) => {
  Contact.find()
    .then(contacts => {
      res.message = "All contacts retrieved.";
      return handler.success(res, contacts);
    })
    .catch(err => {
      err.code = 500;
      return handler.error(err, res);
    });
};

//** Find a single contact with a contactId */
exports.findOne = (req, res) => {
  const id = req.params.contactId;
  Contact.findById(id)
    .then(contact => {
      if (!contact) {
        return handler.error(
          { code: 404, message: "Contact not found with id " + id },
          res
        );
      }
      res.message = "Contact found with id " + id;
      return handler.success(res, contact);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return handler.error(
          { code: 404, message: "Contact not found with id " + id },
          res
        );
      }
      return handler.error(
        { code: 500, message: "Error retrieving contact with id" + id },
        res
      );
    });
};

//** Update a contact identified by the contactId in the request */
exports.update = (req, res) => {
  const id = req.params.contactId;
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Contact content can not be empty"
    });
  }

  const data = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
    create_date: req.body.create_date
  };

  // Find contact and update it with the request body
  Contact.findByIdAndUpdate(id, data, { new: true })
    .then(contact => {
      if (!contact) {
        return handler.error(
          { code: 404, message: "Contact not found with id " + id },
          res
        );
      }
      res.message = "Contact updated successfully";
      return handler.success(res, contact);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return handler.error(
          { code: 404, message: "Contact not found with id " + id },
          res
        );
      }
      return handler.error(
        { code: 500, message: "Error updating contact with id" + id },
        res
      );
    });
};

//** Delete a contact with the specified contactId in the request */
exports.delete = (req, res) => {
  const id = req.params.contactId;
  Contact.findByIdAndRemove(id)
    .then(contact => {
      if (!contact) {
        return handler.error(
          { code: 404, message: "Contact not found with id " + id },
          res
        );
      }
      res.message = "Contact deleted successfully.";
      return handler.success(res, contact);
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return handler.error(
          { code: 404, message: "Contact not found with id " + id },
          res
        );
      }
      return handler.error(
        { code: 500, message: "Could not delete contact with id" + id },
        res
      );
    });
};

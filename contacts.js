const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

function loadContacts(callback) {
  fs.readFile(contactsPath)
    .then((data) => {
      try {
        const contacts = JSON.parse(data);
        callback(contacts);
      } catch (error) {
        console.log(error.message);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function saveContacts(contacts) {
  try {
    const data = JSON.stringify(contacts);
    return fs.writeFile(contactsPath, data, { encoding: "utf8", flag: "w" });
  } catch (error) {
    console.log(error.message);
  }
}

function listContacts() {
  loadContacts(console.table);
}

function getContactById(contactId) {
  loadContacts((contacts) => {
    const contact = contacts.find((x) => x.id === contactId);
    if (!contact) return;
    console.log(contact);
  });
}

function removeContact(contactId) {
  loadContacts((contacts) => {
    const data = contacts.filter((x) => x.id !== contactId);
    saveContacts(data);
    console.table(data);
  });
}

function addContact(name, email, phone) {
  loadContacts((contacts) => {
    contacts.push({ id: v4(), name, email, phone });
    saveContacts(contacts).then(() => console.table(contacts));
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

// # TO GENERATE CONTACTS LIST
async function listContacts() {
const contacts = await fs.readFile(contactsPath, function (err, data) {
    if (err) {
      console.log("error", err.message);
    } else {
      console.log(data.toString());
    }
  });
  }

// # TO FIND CONTACT USING ID
async function getContactById(contactId) {
const allContacts = await listContacts();
const contact = allContacts.find((contact) => contact.id === contactId);
    if (!contact) {
      console.log("error", `Contact with id ${contactId} not found`.red);
    }
    else {
        console.log(contact.toString());
    }
  }

// # TO DELETE CONTACT FROM LIST USING ID
  async function removeContact(contactId) {
    const allContacts = await listContacts();
    const filteredContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  }
  
// # TO ADD A NEW CONTACT TO THE LIST
  async function addContact(name, email, phone) {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
  };
  const existingContact = allContacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (existingContact) {
    console.log("error", `Contact with id ${contactId} is already exist!`.red);
  }
  else {
    allContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  return newContact;
};

export { listContacts, getContactById, removeContact, addContact };
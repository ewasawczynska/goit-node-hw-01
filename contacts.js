import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import colors from "colors";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

// # TO GENERATE CONTACTS LIST
async function listContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  if (!contacts) {
    throw new Error("There are no contacts".red);
  }

  return JSON.parse(contacts);
}

// # TO FIND CONTACT USING ID
async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error(`There is no contact with id ${contactId}`.red);
  }
  return contact;
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
    throw new Error(`${newContact.name} is already in contacts list.`.red);
    return;
  }
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}


export { listContacts, getContactById, removeContact, addContact };
import React from "react";
import CreateContact from "./createContact";
import ListContacts from "./ListContacts";
import { Route } from "react-router-dom";
import * as ContactsAPI from "./Utils/ContactsAPI";

function App() {
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    ContactsAPI.getAll().then((contactsList) => {
      setContacts(contactsList);
    });
  }, []);

  function removeContact(contactToRemove) {
    //setContacts will always receive the old state as paramater (I can use a different name)
    setContacts(
      contacts.filter((contactItem) => contactItem.id !== contactToRemove.id)
    );
    //aca no se pq no me imprime contacts con el nuvo state
    //console.log(contacts);
    ContactsAPI.remove(contactToRemove);
  }

  function addContact(contactToAdd) {
    ContactsAPI.create(contactToAdd).then((addedContact) => {
      setContacts((prevContacts) => prevContacts.concat([addedContact]));
    });
  }

  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={() => (
          <ListContacts
            contacts={contacts}
            removeContactOnClick={removeContact}
          />
        )}
      />
      <Route
        path="/create"
        render={({ history }) => (
          <CreateContact
            onCreateContact={(contactToAdd) => {
              addContact(contactToAdd);
              history.push("/");
            }}
          />
        )}
      />
    </div>
  );
}

export default App;

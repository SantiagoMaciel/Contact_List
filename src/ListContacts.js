import React from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import { Link } from "react-router-dom";
//import sortBy from "sort-by";

function ListContacts({ contacts, removeContactOnClick }) {
  const [query, setQuery] = React.useState("");
  const updateQuery = (inputText) => {
    setQuery(inputText);
  };
  let showingContacts;
  if (query) {
    const match = new RegExp(escapeRegExp(query), "i");
    showingContacts = contacts.filter((contactItem) =>
      match.test(contactItem.name)
    );
  } else {
    showingContacts = contacts;
  }
  //showingContacts.sort(sortBy('name'))

  return (
    <div className="list-contacts">
      <div className="search-contacts">
        <input
          className="search-contacts"
          type="text"
          placeholder="Search contacts"
          value={query}
          onChange={(event) => {
            updateQuery(event.target.value);
          }}
        />
        <Link to="/create" className="add-contact">
          Add
        </Link>
      </div>

      {showingContacts !== contacts && (
        <div className="showing-contacts">
          <p>
            {showingContacts.length} contacts of {contacts.length}
            <button
              onClick={() => {
                showingContacts = contacts;
                setQuery("");
              }}
            >
              Show All
            </button>
          </p>
        </div>
      )}

      <ol className="contact-list">
        {showingContacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div
              className="contact-avatar"
              style={{
                backgroundImage: `url(${contact.avatarURL})`,
              }}
            />
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button
              className="contact-remove"
              onClick={() => removeContactOnClick(contact)}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

ListContacts.protoTypes = {
  contacts: PropTypes.array.isRequired,
  removeContactOnClick: PropTypes.func.isRequired,
};
export default ListContacts;

# Address book app

## Summary

This address book app contains contacts and their personal information. Users are able to use react/nextjs ui to interact (create, retrive, update and delete contacts) directly with a postgres DB.

## REST API

- GET api/contacts - get all contacts
- POST api/contacts - add a contact
- GET api/contacts/:id - get contact by id
- PUT api/contacts/:userId - update contact by id
- DELETE api/contacts/:userId - delete contact data by id
- DELETE api/contacts/delete-all - delete all contact data

## Technologies Used

- frontend: React.js, NextJS
- backend: Node.js/Express, PostgreSQL, Sequelize

## ERD

![Alt text](backend/drawSQL-phonebook-export-2023-10-31.png)

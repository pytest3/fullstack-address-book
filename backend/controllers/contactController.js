const db = require("../db/models");
const { Op } = require("sequelize");

function findAll(req, res) {
  contact
    .findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).send(err.message || "Could'nt retrieve data")
    );
}

function deleteAll(req, res) {
  db.sequelize
    .truncate({ cascade: true, restartIdentity: true })
    .then((done) => res.send("deleted all"));
}

function findOne(req, res) {
  const { first_name } = req.params;
  db.contact
    .findAll({
      where: { first_name: first_name },
      include: [
        { model: db.email },
        { model: db.contact_phone_number },
        { model: db.parent },
        { model: db.employed_contact },
      ],
    })
    .then((contact) => res.send(contact));
}

function add(req, res) {
  db.sequelize.transaction((t) => {
    return db.contact
      .findOrCreate({
        where: {
          [Op.and]: [
            { first_name: req.body.first_name },
            { last_name: req.body.last_name },
          ],
        },
        defaults: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birthday: new Date(req.body.birthday),
          marital_status: req.body.marital_status,
        },
        transaction: t,
      })
      .then(([contact, created]) => {
        if (!created) {
          res.send("Contact already exist");
          return;
        }
        const inputs = [
          {
            model: "contact_phone_number",
            contact_id: contact.id,
            data: {
              phone_number: req.body.phone_number,
            },
          },
          {
            model: "email",
            data: { email_address: req.body.email },
          },
          {
            model: "parent",
            data: {
              number_of_kids: req.body.number_of_kids,
            },
          },
          {
            model: "employed_contact",
            data: {
              company_name: req.body.company_name,
              company_industry: req.body.company_industry,
              role: req.body.role,
            },
          },
        ];

        const promises = inputs.map(({ model, data }) => {
          const field_name = Object.keys(data)[0];
          const field_values = Object.values(data)[0];
          if (Array.isArray(field_values)) {
            field_values.map((field_value) => {
              return db[model].create(
                { [field_name]: field_value, contact_id: contact.id },
                { transaction: t }
              );
            });
            return;
          }
          return db[model].create(
            { ...data, contact_id: contact.id },
            { transaction: t }
          );
        });

        res.send("contact created");
        return Promise.all(promises);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  });
}

module.exports = { findAll, add, deleteAll, findOne };

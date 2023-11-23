const db = require("../db/models");
const { Op } = require("sequelize");

function findAll(req, res) {
  db.contact
    .findAll({
      include: [db.email, db.contact_phone_number, db.employment_detail],
      order: [
        ["first_name", "ASC"],
        ["last_name", "ASC"],
      ],
    })
    .then((data) => {
      if (!data) {
        return res.status(404).send(err.message || "No user data found");
      }
      res.send(data);
    })
    .catch((err) =>
      res.status(404).send(err.message || "Unable to retrieve data")
    );
}

function findById(req, res) {
  const { id } = req.params;
  db.contact
    .findByPk(id, {
      include: [
        db.email,
        db.contact_phone_number,
        db.employment_detail,
        db.parenthood_detail,
        db.hobby,
        db.category,
      ],
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
}

function updateAll(req, res) {
  const { userId } = req.params;
  db.contact
    .findByPk(userId)
    .then((contactInstance) => {
      if (!contactInstance) {
        return res.status(400).send("Contact not found");
      }

      const promises = [];

      promises.push(
        contactInstance.update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birthday: new Date(req.body.birthday),
          marital_status: req.body.marital_status,
          is_employed: req.body.is_employed === "employed",
          is_parent: req.body.is_parent === "parent",
        })
      );

      promises.push(
        contactInstance.getEmployment_detail().then((employmentInstance) =>
          employmentInstance.update({
            company_industry: "health care",
            company_name: "singtel",
            role: "analyst",
          })
        )
      );

      promises.push(
        contactInstance.getParenthood_detail().then((parentHoodInstance) =>
          parentHoodInstance.update({
            son_count: req.body.son_count,
            daughter_count: req.body.daughter_count,
          })
        )
      );

      promises.push(
        contactInstance.getContact_phone_numbers().then((phoneInstances) => {
          for (const index in phoneInstances) {
            const phoneInstance = phoneInstances[index];
            return phoneInstance.update({
              phone_number: req.body.phone_number[index],
            });
          }
        })
      );

      promises.push(
        ...req.body.phone_number.map((phone, index) => {
          return contactInstance
            .getContact_phone_numbers()
            .then((numberInstances) => {
              return numberInstances[index].update({
                phone_number: phone,
              });
            });
        })
      );

      promises.push(
        ...req.body.email.map((email, index) => {
          return contactInstance.getEmails().then((emailInstances) => {
            return emailInstances[index].update({
              email_address: email,
            });
          });
        })
      );

      promises.push(
        ...req.body.category.map((category, index) => {
          return contactInstance.getCategories().then((categoryInstances) => {
            return categoryInstances[index].update({ category_name: category });
          });
        })
      );

      promises.push(
        ...req.body.hobby_name.map((hobby, index) => {
          return contactInstance.getHobbies().then((hobbyInstance) => {
            return hobbyInstance[index].update({ hobby_name: hobby });
          });
        })
      );

      return Promise.all(promises);
    })
    .then((updatedContact) => {
      console.log(updatedContact);
      return res.json(updatedContact);
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).send(err);
    });
}

function deleteAll(req, res) {
  db.sequelize
    .truncate({ cascade: true, restartIdentity: true })
    .then(() => {
      res.send("deleted all");
    })
    .catch((err) =>
      res.status(404).send({ status: "error", error: { message: err.message } })
    );
}

async function deleteContact(req, res) {
  try {
    const contactIds = req.body;

    await db.sequelize.transaction(async (t) => {
      for (const contactId of contactIds) {
        await db.contact_phone_number.destroy({
          where: { contact_id: contactId },
          transaction: t,
        });
        await db.email.destroy({
          where: { contact_id: contactId },
          transaction: t,
        });
        await db.parenthood_detail.destroy({
          where: { contact_id: contactId },
          transaction: t,
        });
        await db.employment_detail.destroy({
          where: { contact_id: contactId },
          transaction: t,
        });
        await db.category.destroy({
          where: { id: contactId },
          transaction: t,
        });
        await db.hobby.destroy({
          where: { id: contactId },
          transaction: t,
        });
        await db.contact_category.destroy({
          where: { contact_id: contactId },
          transaction: t,
        });
        await db.contact_hobby.destroy({
          where: { contact_id: contactId },
          transaction: t,
        });

        await db.contact.destroy({
          where: { id: contactId },
          transaction: t,
        });
      }
    });

    res.send({
      status: "Deleted contact(s) successfully",
      message: `Deleted contact(s) id: ${contactIds}`,
    });
  } catch (err) {
    const error = new Error();
    error.name = "Unable to delete contact";
    error.message = err.message;
    throw error;
  }
}

function deleteOne(req, res) {
  const { userId } = req.params;

  db.contact
    .findByPk(userId)
    .then((userInstance) => {
      return Promise.all([
        userInstance.destroy(),

        userInstance.getEmployment_detail().then((employmentInstance) => {
          employmentInstance?.destroy();
        }),

        userInstance
          .getParenthood_detail()
          .then((parentHoodInstance) => parentHoodInstance?.destroy()),

        userInstance.getEmails().then((emailInstances) => {
          emailInstances.map((emailInstance) => {
            return emailInstance?.destroy();
          });
        }),

        userInstance.getContact_phone_numbers().then((numberInstances) => {
          numberInstances.map((numberInstance) => {
            return numberInstance?.destroy();
          });
        }),

        userInstance.getCategories().then((categoryInstances) => {
          categoryInstances.map((categoryInstance) => {
            return categoryInstance?.destroy();
          });
        }),

        userInstance.getHobbies().then((hobbyInstances) => {
          hobbyInstances.map((hobbyInstance) => {
            return hobbyInstance?.destroy();
          });
        }),
      ]);
    })
    .then((done) => {
      res.send("Contact deleted");
    })
    .catch((err) => {
      res.status(err.status || 500).send({
        status: "error",
        error: {
          message: err.message || "cannot delete contact",
        },
      });
    });
}

function findByName(req, res) {
  const { first_name } = req.params;
  db.contact
    .findAll({
      where: { first_name: first_name },
      include: [db.hobby, db.category],
    })
    .then((contact) => {
      if (!contact) {
        return res.status(400).send("contact not found");
      }
      res.send(contact);
    });
}

async function addOne(req, res) {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const existingContact = await db.contact.findOne({
        where: {
          [Op.and]: [
            { first_name: req.body.first_name },
            { last_name: req.body.last_name },
          ],
        },
        transaction: t,
      });

      if (existingContact) {
        return res.status(400).send({
          status: "error",
          error: { message: "contact exists" },
        });
      }

      const newContact = await db.contact.create(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birthday: new Date(req.body.birthday),
          marital_status: req.body.marital_status,
          is_employed: req.body.is_employed,
          is_parent: req.body.is_parent,
        },
        { transaction: t }
      );

      await newContact.createParenthood_detail(
        {
          daughter_count: req.body.daughter_count,
          son_count: req.body.son_count,
        },
        { transaction: t }
      );

      await newContact.createEmployment_detail(
        {
          company_name: req.body.company_name,
          company_industry: req.body.company_industry,
          role: req.body.role,
        },
        { transaction: t }
      );

      for (element of req.body.phone_number) {
        await newContact.createContact_phone_number(
          {
            phone_number: element,
          },
          { transaction: t }
        );
      }

      for (element of req.body.email) {
        await newContact.createEmail(
          { email_address: element },
          { transaction: t }
        );
      }

      for (element of req.body.category) {
        await newContact.createCategory(
          { category_name: element },
          { transaction: t }
        );
      }

      for (element of req.body.hobby_name) {
        await newContact.createHobby(
          { hobby_name: element },
          { transaction: t }
        );
      }

      return newContact;
    });

    return res.status(202).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "error",
      error: {
        name: err.name || "Sequelize DB error",
        message: err.message || "Could not create contact",
        others: err,
      },
    });
  }
}

function testAdd(req, res) {
  db.contact
    .create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: new Date(req.body.birthday),
      marital_status: req.body.marital_status,
      is_employed: req.body.is_employed,
      is_parent: req.body.is_parent,
    })
    .then((contact) => res.send(contact))
    .catch((err) => res.send(err));
}
// function add(req, res) {
//   db.sequelize.transaction((t) => {
//     return db.contact
//       .findOne({
//         where: {
//           [Op.and]: [
//             { first_name: req.body.first_name },
//             { last_name: req.body.last_name },
//           ],
//         },
//         transaction: t,
//       })
//       .then((contactInstance) => {
//         if (contactInstance) {
//           console.log("contact exists");
//           return res.send({
//             status: "error",
//             error: { message: "contact exists" },
//           });
//         }
//         return db.contact
//           .create(
//             {
//               first_name: req.body.first_name,
//               last_name: req.body.last_name,
//               birthday: new Date(req.body.birthday),
//               marital_status: req.body.marital_status,
//               is_employed: req.body.is_employed === "Employed",
//               is_parent: req.body.is_Parent === "Parent",
//             },
//             { transaction: t }
//           )
//           .then((contactInstance) => {
//             const contactId = contactInstance.id;
//             const promises = [];
//             promises.push(
//               contactInstance
//                 .createParenthood_detail(
//                   {
//                     daughter_count: req.body.daughter_count,
//                     son_count: req.body.son_count,
//                   },
//                   { transaction: t }
//                 )
//                 .catch((err) => {
//                   return err;
//                 }),

//               contactInstance
//                 .createEmployment_detail(
//                   {
//                     company_name: req.body.company_name,
//                     company_industry: req.body.company_industry,
//                     role: req.body.role,
//                   },
//                   { transaction: t }
//                 )
//                 .catch((err) => {
//                   return err;
//                 }),

//               for (element of req.body.phone_number) {
//                 promises.push(
//                   contactInstance.createContact_phone_number(
//                     {
//                       phone_number: element,
//                     },
//                     { transaction: t }
//                   )
//                 );
//               }

//               for (element of req.body.email) {
//                 promises.push(
//                   contactInstance.createEmail(
//                     { email_address: element },
//                     { transaction: t }
//                   )
//                 );
//               }

//               for (element of req.body.category) {
//                 promises.push(
//                   contactInstance.createCategory(
//                     { category_name: element },
//                     { transaction: t }
//                   )
//                 );
//               }

//               for (element of req.body.hobby_name) {
//                 promises.push(
//                   contactInstance.createHobby(
//                     { hobby_name: element },
//                     { transaction: t }
//                   )
//                 );
//               }
//             )
//             return [Promise.all(promises), contactId];
//           })
//           .then(([promises, contactId]) => {
//             console.log("+++++++");
//             console.log(contactId);
//             console.log("+++++++");
//             return res.send({ contact_id: contactId });
//           })
//           .catch((err) => {
//             console.log("======");
//             console.log("error has been reached!!!!!!!!!");
//             console.log("======");

//             return res.send(err);
//           });
//       });
//   });
// }

function testQuery(req, res) {
  db.category
    .findAll({
      attributes: [
        "category_name",

        [
          sequelize.fn("COUNT", sequelize.col("category_name")),
          "category_count",
        ],
      ],
      group: ["category_name"],
    })
    .then((data) => res.send(data));
}

module.exports = {
  findAll,
  findByName,
  findById,
  deleteAll,
  addOne,
  updateAll,
  deleteOne,
  deleteContact,
};

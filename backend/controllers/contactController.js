const db = require("../db/models");
const { Op } = require("sequelize");

function findAll(req, res) {
  console.log("findAll controller ran");

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
      // console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
}

function updateAll(req, res) {
  console.log("update controller ran");
  const { userId } = req.params;
  db.sequelize.transaction((t) => {
    return db.contact
      .findByPk(userId)
      .then((contactInstance) => {
        console.log("========");
        console.log(contactInstance);
        if (!contactInstance) {
          return res.status(400).send("Contact not found");
        }
        console.log(contactInstance);
        return contactInstance;
      })
      .then((contactInstance) => {
        const promises = [];
        promises.push(
          contactInstance.update(
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              birthday: new Date(req.body.birthday),
              marital_status: req.body.marital_status,
              is_employed: req.body.is_employed,
              is_parent: req.body.is_parent,
            },
            { transaction: t }
          )
        );
        promises.push(
          contactInstance.getEmployment_detail().then((employmentInstance) => {
            return employmentInstance.update(
              {
                company_industry: req.body.company_industry,
                company_name: req.body.company_name,
                role: req.body.role,
              },
              { transaction: t }
            );
          })
        );
        promises.push(
          contactInstance.getParenthood_detail().then((parentHoodInstance) =>
            parentHoodInstance.update(
              {
                son_count: req.body.son_count,
                daughter_count: req.body.daughter_count,
              },
              { transaction: t }
            )
          )
        );
        promises.push(
          contactInstance
            .getContact_phone_numbers()
            .then((numberInstances) => {
              return Promise.all(
                numberInstances.map((instance) => {
                  return instance.destroy({ transaction: t });
                })
              );
            })
            .then(() => {
              return Promise.all(
                req.body.phone_number.map((item) => {
                  return contactInstance.createContact_phone_number(
                    {
                      phone_number: item,
                    },
                    { transaction: t }
                  );
                })
              );
            })
        );
        promises.push(
          contactInstance
            .getEmails()
            .then((emailInstances) => {
              return Promise.all(
                emailInstances.map((instance) => {
                  return instance.destroy({ transaction: t });
                })
              );
            })
            .then(() => {
              return Promise.all(
                req.body.email.map((item) => {
                  return contactInstance.createEmail(
                    {
                      email_address: item,
                    },
                    { transaction: t }
                  );
                })
              );
            })
        );
        promises.push(
          contactInstance
            .getCategories()
            .then((categoryInstances) => {
              return Promise.all(
                categoryInstances.map((instance) => {
                  return instance.destroy({ transaction: t });
                })
              );
            })
            .then(() => {
              return Promise.all(
                req.body.category.map((item) => {
                  return contactInstance.createCategory(
                    {
                      category_name: item,
                    },
                    { transaction: t }
                  );
                })
              );
            })
        );
        promises.push(
          contactInstance
            .getHobbies()
            .then((hobbyInstances) => {
              const hobbyPromises = [];
              for (const instance of hobbyInstances) {
                hobbyPromises.push(instance.destroy({ transaction: t }));
              }
              return Promise.all(hobbyPromises);
            })
            .then(() => {
              const newHobbyPromises = [];
              for (element of req.body.hobby_name) {
                newHobbyPromises.push(
                  contactInstance.createHobby(
                    { hobby_name: element },
                    { transaction: t }
                  )
                );
              }
              return Promise.all(newHobbyPromises);
            })
        );

        return Promise.all(promises);
      })
      .then((updatedContact) => {
        return res.json(updatedContact);
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).send(err);
      });
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
  console.log("addOne controller ran");

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
    // console.log(err);
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

// function deleteOne(req, res) {
//   const { userId } = req.params;

//   db.contact
//     .findByPk(userId)
//     .then((userInstance) => {
//       return Promise.all([
//         userInstance.getEmployment_detail().then((employmentInstance) => {
//           employmentInstance.destroy();
//         }),
//         userInstance
//           .getParenthood_detail()
//           .then((parentHoodInstance) => parentHoodInstance.destroy()),

//         userInstance.getEmails().then((emailInstances) => {
//           emailInstances.map((emailInstance) => {
//             emailInstance.destroy();
//           });
//         }),

//         userInstance.getContact_phone_numbers().then((numberInstances) => {
//           numberInstances.map((numberInstance) => {
//             return numberInstance.destroy();
//           });
//         }),

//         userInstance.getCategories().then((categoryInstances) => {
//           categoryInstances.map((categoryInstance) => {
//             return categoryInstance.destroy();
//           });
//         }),

//         userInstance.getHobbies().then((hobbyInstances) => {
//           hobbyInstances.map((hobbyInstance) => {
//             return hobbyInstance.destroy();
//           });
//         }),

//         userInstance.destroy(),
//       ]);
//     })
//     .then((done) => {
//       res.send("Contact deleted");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(err.status || 500).send({
//         status: "error",
//         error: {
//           message: err.message || "cannot delete contact",
//         },
//       });
//     });
// }

module.exports = {
  findAll,
  findByName,
  findById,
  deleteAll,
  addOne,
  updateAll,
  deleteContact,
};

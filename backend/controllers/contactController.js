const db = require("../db/models");
const { Op } = require("sequelize");

function findAll(req, res) {
  db.contact
    .findAll()
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
          is_employed: req.body.is_employed,
          is_parent: req.body.is_parent,
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
        ...req.body.phone_number.map((phoneNumber, index) => {
          return contactInstance
            .getContact_phone_numbers()
            .then((numberInstances) => {
              return numberInstances[index].update({
                phone_number: phoneNumber,
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

      // for (index in req.body.hobby_name) {
      //   promises.push(
      //     contactInstance.getHobbies().then((hobbyInstances) => {
      //       return hobbyInstances.update({
      //         hobby_name: req.body.hobby_name,
      //       });
      //     })
      //   );
      // }

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
  db.sequelize.truncate({ cascade: true, restartIdentity: true }).then(() => {
    res.send("deleted all");
  });
}

function deleteOne(req, res) {
  const { userId } = req.params;
  db.contact
    .findByPk(userId)
    .then((userInstance) => {
      return Promise.all([
        userInstance
          .getEmployment_detail()
          .then((employmentInstance) => employmentInstance.destroy()),

        userInstance
          .getParenthood_detail()
          .then((parentHoodInstance) => parentHoodInstance.destroy()),

        userInstance.getEmails().then((emailInstances) => {
          emailInstances.map((emailInstance) => {
            return emailInstance.destroy();
          });
        }),

        userInstance.getContact_phone_numbers().then((numberInstances) => {
          numberInstances.map((numberInstance) => {
            return numberInstance.destroy();
          });
        }),

        userInstance.getCategories().then((categoryInstances) => {
          categoryInstances.map((categoryInstance) => {
            return categoryInstance.destroy();
          });
        }),

        userInstance.getHobbies().then((hobbyInstances) => {
          hobbyInstances.map((hobbyInstance) => {
            return hobbyInstance.destroy();
          });
        }),
      ]);
    })
    .then(res.send("Contact deleted"))
    .catch((err) => console.log(err));
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
          is_employed: true,
          is_parent: true,
        },
        transaction: t,
      })
      .then(([contact, created]) => {
        if (!created) {
          return res.send("contact exists");
        }
        const promises = [];
        promises.push(
          contact.createParenthood_detail(
            {
              daughter_count: req.body.daughter_count,
              son_count: req.body.son_count,
            },
            { transaction: t }
          ),
          contact.createEmployment_detail(
            {
              company_name: req.body.company_name,
              company_industry: req.body.company_industry,
              role: req.body.role,
            },
            { transaction: t }
          )
        );
        for (element of req.body.phone_number) {
          promises.push(
            contact.createContact_phone_number(
              {
                phone_number: element,
              },
              { transaction: t }
            )
          );
        }
        for (element of req.body.email) {
          promises.push(
            contact.createEmail({ email_address: element }, { transaction: t })
          );
        }
        for (element of req.body.category) {
          promises.push(
            contact.createCategory(
              { category_name: element },
              { transaction: t }
            )
          );
        }
        for (element of req.body.hobby_name) {
          promises.push(
            contact.createHobby({ hobby_name: element }, { transaction: t })
          );
        }
        return Promise.all(promises);
      })
      .then((contact) => res.send(contact))
      .catch((err) => {
        console.log(err);
        return res.send(err);
      });
  });
}

module.exports = {
  findAll,
  findByName,
  deleteAll,
  add,
  updateAll,
  deleteOne,
};

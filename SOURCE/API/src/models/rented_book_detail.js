"use strict";

const Sequelize = require("sequelize");
const { on } = require("nodemon");
const Model = Sequelize.Model;
var sequelize = require(__dirname + "/../config/env.js");
class rented_book_detail extends Model {}
rented_book_detail.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rentedBookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    readerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    lost: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    borrowedDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    borrowedConfirmMemberId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    returnedDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    returnedConfirmMemberId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    note: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    outOfDate: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    // updatedDate: {
    //   type: Sequelize.DATE,
    //   allowNull: true,
    // },
    // updatedMemberId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    // },
    isActive: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "rented_book_detail",
    freezeTableName: true,
    timestamps: false
  }
);

//add reference foreign key
rented_book_detail.associate = (db) => {

  //reader
  db.rented_book_detail.belongsTo(db.reader, {
    foreignKey: {
      name: "readerId",
    },
  });

  //rented_book
  db.rented_book_detail.belongsTo(db.rented_book, {
    foreignKey: {
      name: "rentedBookId",
    },
  });

  //member
  // db.rented_book_detail.belongsTo(db.member, {
  //   foreignKey: {
  //     name: "updatedMemberId",
  //   },
  // });
  db.rented_book_detail.belongsTo(db.member, {
    foreignKey: {
      name: "borrowedConfirmMemberId",
    },
    as: 'borrowedConfirmMemberRentedDetail'
  });
  db.rented_book_detail.belongsTo(db.member, {
    foreignKey: {
      name: "returnedConfirmMemberId",
    },
    as: 'returnedConfirmMemberRentedDetail'
  });

  //book
  db.rented_book_detail.belongsTo(db.book, {
    foreignKey: {
      name: "bookId",
    },
  });

};

module.exports = () => rented_book_detail;

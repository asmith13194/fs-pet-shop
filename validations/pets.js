'use strict';

const Joi = require('joi');

module.exports.get = {
  body: {
    email: Joi.string()
      // .label('Email')
      // .required()
      // .email()
      // .trim(),

    // password: Joi.string()
      // .label('Password')
      // .required()
      // .trim()
      // .min(8)
  }
};

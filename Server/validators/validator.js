const Joi = require("joi");
const createError = require("http-errors");

const validator = (schema) => (payload) =>
   schema.validate(payload, { abortEarly: false });

const adminSchema = Joi.object({
   fullName: Joi.string().required(),
   email: Joi.string().required().min(8).error(createError.BadRequest({
      fa: 'نام کاربری وارد شده صحیح نیست',
      en: 'Invalid Username'
   })),
   phoneNumber: Joi.string().required().length(11).pattern(/^09[0-9]{9}$/).error(createError.BadRequest({
      fa: 'شماره موبایل وارد شده صحیح نمیباشد',
      en: 'Invalid Phone number'
   }
   )),
   languages: Joi.array().required().min(1).items('fa', 'en', 'ar', 'fr').error(createError.BadRequest({
      fa: 'زبان وارد شده صحیح نمیباشد',
      en: 'Inavlid languages'
   })),
   password: Joi.string().optional(),
   projectName: Joi.string().optional(),
   projectNameFa: Joi.string().optional(),
   plan: Joi.string().optional(),
   gifDays: Joi.number().optional(),
   maxDays: Joi.number().optional(),
   domain: Joi.string().optional(),
});

const userSchema = Joi.object({
   fullName: Joi.string().required(),
   phoneNumber: Joi.string().required().length(11).pattern(/^09[0-9]{9}$/).error(createError.BadRequest({
      fa: 'شماره موبایل وارد شده صحیح نمیباشد',
      en: 'Invalid Phone number'
   }
   )),
   projects: Joi.object({
      name: Joi.string().required(),
      orders: Joi.number().required().min(0)
   })
});

const itemSchema = Joi.object({
   name: {
      fa: Joi.string().min(3).max(15).optional(),
      en: Joi.string().min(3).max(15).optional(),
      ar: Joi.string().min(3).max(15).optional(),
      fr: Joi.string().min(3).max(15).optional(),
   },
   itemDescription: {
      fa: Joi.string().min(5).optional(),
      en: Joi.string().min(5).optional(),
      ar: Joi.string().min(5).optional(),
      fr: Joi.string().min(5).optional(),
   },
   unit: Joi.string().required(),
   price: Joi.number().required(),
   discount: Joi.number().required().min(0).max(100),
   available: Joi.boolean().required(),
   hideItem: Joi.boolean().required(),
   // imageId: Joi.any().optional(),
   image: Joi.string().required(),
   tags: Joi.array().optional().max(2),
   // domain: Joi.string().optional(),
   subCategory: Joi.string().optional().max(50),
   category: Joi.string().required(),
   project: Joi.string().required(),
   ratings: Joi.array().optional()
});

const categorySchema = Joi.object({
   name: {
      fa: Joi.string().min(3).max(15).optional(),
      en: Joi.string().min(3).max(15).optional(),
      ar: Joi.string().min(3).max(15).optional(),
      fr: Joi.string().min(3).max(15).optional(),
   },
   image: Joi.any().required(),
   // imageId: Joi.any().optional(),
   // domain: Joi.string().optional(),
   subCategory: Joi.array().min(1),
   project: Joi.string().required()
});

const phoneNumberSchema = Joi.object({
   phoneNumber: Joi.string().required().length(11).pattern(/^09[0-9]{9}$/).error(createError.BadRequest({
      fa: 'شماره موبایل وارد شده صحیح نمی باشد',
      en: 'Invalid Phone number'
   }
   )),
})

exports.validateItem = validator(itemSchema);
exports.validateCategory = validator(categorySchema);
exports.validateAdmin = validator(adminSchema);
exports.validateUser = validator(userSchema);
exports.validatePhoneNumber = validator(phoneNumberSchema);
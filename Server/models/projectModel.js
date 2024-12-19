const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   about: {
      fa: { type: String, trim: true, default: 'متن پیشفرض' },
      en: { type: String, trim: true, default: 'default text' },
      ar: { type: String, trim: true, default: 'default text' },
      fr: { type: String, trim: true, default: 'default text' },
   },
   headerText: {
      fa: { type: String, trim: true, default: 'متن پیشفرض' },
      en: { type: String, trim: true, default: 'default text' },
      ar: { type: String, trim: true, default: 'default text' },
      fr: { type: String, trim: true, default: 'default text' },
   },
   logo: {
      type: String,
      trim: true,
   },
   socials: {
      instagram: {
         type: String,
         trim: true
      },
      waze: {
         type: String,
         trim: true
      },
      googlemap: {
         type: String,
         trim: true
      },
      phone: {
         type: String,
         trim: true
      },
      neshan: {
         type: String,
         trim: true
      },
      balad: {
         type: String,
         trim: true
      },
   },
   workingHours: {
      weekDays: {
         'WeekDays O': {
            type: String,
         },
         'WeekDays C': {
            type: String,
         }
      },
      friday: {
         'Friday O': {
            type: String,
         },
         'Friday C': {
            type: String,
         }
      },
   },
   theme: {
      type: String,
      required: true,
      trim: true,
   },
   customPalate: {
      'primary-background': String,
      'primary-300': String,
      'primary-500': String,

      'typography-navbar': String,
      'typography-herosection': String,
      'typography-500': String,
      'typography-700': String,
      'sidebar-background': String,

      'category-background': String,
      'item-background': String,
      'herosection-background': String,
      'card-category-background': String,
      'card-item-background': String,
   },
});

const Project = mongoose.model('projects', projectSchema);

module.exports = Project;
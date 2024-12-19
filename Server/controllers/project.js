const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
   try {
      await Project.create({
         name: req.headers.project,
         aboutText: '',
         socials: {
            instagram: '',
            phone: '',
            map: ''
         },
         theme: req.body.theme,
         workingHours: {
            weekDays: {
               'WeekDays O': '',
               'WeekDays C': ''
            },
            friday: {
               'Friday O': '',
               'Friday C': ''
            }
         }
      });

      res
         .status(200)
         .json({
            status: "success",
            message: "ساختار پروژه با موفقیت ایجاد شد"
         })
   } catch (err) {
      console.log(err)
      res
         .status(404)
         .json({
            status: "failed",
            message: "ساخت ساختار پروژه با مشکل مواجه شد !"
         })
   }
};

exports.updateProject = async (req, res) => {
   try {
      const projectName = req.params.projectName;
      const bodyKeys = Object.keys(req.body);
      const project = await Project.findOne({ name: projectName });
      if (bodyKeys.length > 1) {
         bodyKeys.forEach(eachKey => {
            project[eachKey] = req.body[eachKey];
         })
      } else {
         project[bodyKeys] = req.body[bodyKeys];
      }
      project.save();
      res
         .status(200)
         .json({
            status: "success",
            message: "Project Data changed successfully",
            projectData: project
         })
   } catch (err) {
      console.log(err)
      res
         .status(404)
         .json({
            status: "failed",
            message: "ساخت ساختار پروژه با مشکل مواجه شد !"
         })
   }
};

exports.getProject = async (req, res) => {
   try {
      const projectName = req.params.projectName;
      const project = await Project.findOne({ name: projectName });
      res
         .status(200)
         .json({
            status: "success",
            message: "Project Data changed successfully",
            projectData: project
         })
   } catch (err) {
      console.log(err)
      res
         .status(404)
         .json({
            status: "failed",
            message: "ساخت ساختار پروژه با مشکل مواجه شد !"
         })
   }
}
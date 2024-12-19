const TableReserve = require('../models/tableReserveModel');

exports.addTableReserve = async (req, res) => {
   const { phoneNumber, fullName, persons, date, time } = req.body;
   const { project } = req.headers
   try {
      await TableReserve.create({ phoneNumber, fullName, persons: +persons, date, time, project })
      return res.status(201).json({ message: 'Table Reserved Successfully.' });
   } catch (error) {
      return res.status(404).json({ message: 'Failed to reseve table.' });
   }
}

exports.getTableReseved = async (req, res) => {
   const { project } = req.headers
   try {
      const TableReserves = await TableReserve.find({ project })
      return res.status(200).json({ message: 'Table Reserved Successfully.', TableReserves });
   } catch (error) {
      return res.status(404).json({ message: 'Failed to reseve table.' });
   }
}
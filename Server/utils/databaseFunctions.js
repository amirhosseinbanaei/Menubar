exports.getAll = (Model, filterQuery, popOptions = false) => {
   return new Promise(async (resolve, reject) => {
      try {
         const query = Model.find(filterQuery);
         if (popOptions) query = query.populate(popOptions);
         const doc = await query
         resolve(doc)
      } catch (error) {
         console.log(error);
         reject(false)
      }
   })
}

exports.getOne = (Model, filterQuery, popOptions = false) => {
   return new Promise(async (resolve, reject) => {
      try {
         const query = await Model.findOne(filterQuery).populate(popOptions && popOptions);
         resolve(query);
      } catch (error) {
         reject(false)
      }
   })
};

exports.updateOne = (Model, filterQuery, newData) => {
   return new Promise(async (resolve, reject) => {
      try {
         const query = await Model.findOneAndUpdate(filterQuery, newData, {
            returnOriginal: false
         });
         resolve(query);
      } catch (error) {
         reject(false)
      }
   })
};

exports.createOne = (Model, newData) => {
   return new Promise(async (resolve, reject) => {
      try {
         const query = await Model.create(newData);
         resolve(query);
      } catch (error) {
         reject(false)
      }
   })
};
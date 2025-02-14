import * as Yup from 'yup';

export const itemSchema = Yup.object().shape({
   // image: Yup.mixed()
   //    .required('Image is required')
   //    .test('fileSize', 'Maximum file size is 10MB', function (value) {
   //       if (!value) return false; // Fail the validation if no file is selected
   //       const file = value[0];
   //       const maxSize = 10 * 1024 * 1024; // Maximum file size in bytes (10MB)
   //       return file.size <= maxSize;
   //    }),
   name: Yup.string()
      .required('اسم آیتم را وارد کنید')
      .min(3, 'اسم آیتم حداقل باید دارای 3 کاراکتر باشد')
      .max(15, 'اسم آیتم حداکثر باید دارای 15 کاراکتر باشد'),
   price: Yup.string().required('قیمت مورد آیتم را وارد کنید .'),
   category: Yup.string().notOneOf(['0', 'انتخاب نشده'], 'دسته بندی مناسب آیتم را وارد کنید .').required(),
   cardDescription: Yup.string().required('توضیحات آیتم اجباری میباشد').min(10, 'توضیحات آیتم حداقل باید دارای 10 کاراکتر باشد'),
   // hideItem: Yup.boolean().required(),
   // availabe: Yup.boolean().required(),
})
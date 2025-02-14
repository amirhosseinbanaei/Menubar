import * as yup from 'yup';
import { translationInputErrors } from '../utils/translation';
export const categorySchema = yup.object().shape({
   // image: Yup.mixed()
   //    .required('Image is required')
   //    .test('fileSize', 'Maximum file size is 10MB', function (value) {
   //       if (!value) return false; // Fail the validation if no file is selected
   //       const file = value[0];
   //       const maxSize = 10 * 1024 * 1024; // Maximum file size in bytes (10MB)
   //       return file.size <= maxSize;
   //    }),
   name: yup.string()
      .required(translationInputErrors('required', 'name'))
      .min(3, translationInputErrors('min', 'name'))
      .max(15, translationInputErrors('max', 'name')),
})

import { useContext, useMemo } from 'react';

// Layout
import MainSection from '../layouts/MainSection';

// Third Party Library
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

// Data
import { addCategoryPageInputs } from '../data/InputsData';
import { categorySchema } from '../validators/CategorySchema';
import { addCategory } from '../services/Axios/Requests/Category';
import { uploadImage } from '../services/Axios/Requests/UploadImage';
// Components
import FormButton from '../components/Form/FormButton';
import InputContainer from '../components/Input/InputContainer';
import ImageUploader from '../components/Containers/ImageUploader';
import { AuthContext } from '../contexts/AuthContext';

export default function AddCategory() {
  const { currentUser } = useContext(AuthContext);

  const methods = useForm({
    defaultValues: {
      name: '',
      image: '',
    },
    resolver: yupResolver(categorySchema),
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = methods.getValues();
    const imageId = uuidv4();
    const formData = new FormData();
    toast.loading('درحال افزودن دسته بندی ...');

    const reqConfig = async (existImage) => {
      const reqData = {
        language: currentUser.languages.join(','),
        domain: currentUser.domain,
        imageId: existImage && imageId,
      };
      if (currentUser.languages.length > 1) {
        currentUser.languages.forEach((lang) => {
          reqData[`${lang}Name`] = data.name;
        });
      } else {
        reqData[`${currentUser.languages[0]}Name`] = data.name;
      }
      const req = await addCategory(reqData);
      if (req.status === 201) {
        toast.dismiss();
        toast.success('دسته بندی با موفقیت افزوده شد');
        methods.reset();
        // location.reload();
      }
    };
    console.log(data.image)
    if (data.image && data.image.length !== 0) {
      formData.append('image', data.image[0]);
      formData.append('imageId', imageId);
      const isUploadImage = await uploadImage(
        currentUser.domain,
        formData && formData,
      );
      if (isUploadImage.status === 200) {
        reqConfig(true);
      }
    } else {
      reqConfig(false);
    }
  };

  return (
    <>
      <MainSection sectionTitle={'افزودن دسته بندی'}>
        <form encType='multipart/form-data'>
          {useMemo(() => {
            return (
              <ImageUploader
                methods={methods}
                label={'imageUploader'}
              />
            );
          }, [methods.getValues('image')])}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'>
            {useMemo(() => {
              return (
                <InputContainer
                  options={addCategoryPageInputs[0]}
                  methods={methods}
                />
              );
            }, [methods.getValues('name')])}
          </div>

          <FormButton
            formState={methods.formState}
            ctaButton={{ title: 'افزودن دسته بندی', handler: onSubmit }}
          />
        </form>
      </MainSection>
    </>
  );
}

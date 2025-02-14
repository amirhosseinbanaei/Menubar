import { useContext, useEffect, useMemo } from 'react';

// Layout
import MainSection from '../layouts/MainSection';

// Third Party Library
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Context
import { LanguageContext } from '../contexts/LanguageContext';

// Data
import { addCategoryPageInputs } from '../data/InputsData';
import { categorySchema } from '../validators/CategorySchema';
import {
  editCategory,
  getSingleCategory,
} from '../services/Axios/Requests/Category';

// Components
import FormButton from '../components/Form/FormButton';
import BouncingLoader from '../components/Loaders/Bouncing';
import InputContainer from '../components/Input/InputContainer';
import ImageUploader from '../components/Containers/ImageUploader';

// Utils
import urlFunctions from '../utils/urlFunctions';
import useReactQuery from '../hooks/useReactQuery';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from 'react-router-dom';

export default function EditCategory() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const categoryId = urlFunctions.getParamsFromUrl('id');
  const categoryName = urlFunctions.removeDashedPathname(2);

  const { mainData, isLoading } = useReactQuery(
    ['categories', categoryId],
    getSingleCategory,
    categoryId,
  );

  const methods = useForm({
    defaultValues: {
      name: '',
      image: '',
    },
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    if (mainData) {
      methods.setValue('name', mainData[language].name);
      methods.setValue('image', mainData.image);
    }
  }, [mainData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = methods.getValues();
    const formData = new FormData();
    const changedField = Object.keys(methods.formState.dirtyFields);
    formData.append('language', language);
    if (changedField.length === 1) {
      if (changedField[0] === 'image') {
        formData.append(`category-image`, data[changedField][0]);
      } else {
        formData.append(`${language}.${changedField}`, data[changedField]);
      }
    } else {
      changedField.forEach((eachChangedData) => {
        if (eachChangedData === 'image') {
          formData.append(`category-image`, data[eachChangedData][0]);
        } else {
          formData.append(
            `${language}.${eachChangedData}`,
            data[eachChangedData],
          );
        }
      });
    }
    toast.loading('درحال ویرایش دسته بندی ...');
    const req = await editCategory(categoryId, formData && formData);
    if (req.status === 200) {
      toast.dismiss();
      toast.success('دسته بندی با موفقیت ویرایش شد .');
      navigate('/categories');
    }
  };

  return (
    <>
      <MainSection sectionTitle={`ویرایش دسته بندی ${categoryName}`}>
        {isLoading && (
          <div className='w-full h-96 flex flex-col items-center justify-center'>
            <BouncingLoader />
          </div>
        )}
        <form
          encType='multipart/form-data'
          className={`${!mainData && 'hidden'}`}>
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
            ctaButton={{ title: 'ویرایش دسته بندی', handler: onSubmit }}
          />
        </form>
        <DevTool control={methods.control} />
      </MainSection>
    </>
  );
}

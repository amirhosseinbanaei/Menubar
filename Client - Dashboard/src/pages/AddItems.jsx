import { useContext, useEffect, useId, useMemo, useState } from 'react';

// Layout
import MainSection from '../layouts/MainSection';

// Third Party Library
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Context
import { LanguageContext } from '../contexts/LanguageContext';

// Data
import { addItemPageInputs } from '../data/InputsData';
import { getCategories } from '../services/Axios/Requests/Category';

// Components
import FormButton from '../components/Form/FormButton';
import InputContainer from '../components/Input/InputContainer';
import ImageUploader from '../components/Containers/ImageUploader';
import useReactQuery from '../hooks/useReactQuery';
import { addItem, addItemWithExcel } from '../services/Axios/Requests/Items';
import CustomTab from '../components/Navigation/Tab';
import { itemSchema } from '../validators/ItemSchema';

export default function AddItems() {
  const tabData = [
    { title: 'افزودن آیتم', child: <AddItem /> },
    { title: 'افزودن با فایل', child: <AddItemsWithExcel /> },
  ];

  return (
    <>
      <CustomTab tabData={tabData} />
    </>
  );
}

function AddItem() {
  const methods = useForm({
    defaultValues: {
      name: '',
      price: '',
      category: '0',
      subCategory: '0',
      image: '',
      cardDescription: '',
      discount: '0',
    },
    // resolver: yupResolver(itemSchema),
  });

  const { language } = useContext(LanguageContext);
  const { mainData: categories } = useReactQuery('Categories', getCategories);
  const [categoryBoxOptions, setCategoryBoxOptions] = useState(false);
  const [subCategoryBoxOptions, setSubCategoryBoxOptions] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const data = methods.getValues();
    const formData = new FormData();
    formData.append('language', language);
    formData.append('item-image', data.image[0]);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append(`${language}Name`, data.name);
    formData.append(`${language}subCategory`, data.subCategory);
    formData.append(`${language}CardDescription`, data.cardDescription);
    toast.loading('درحال افزودن آیتم ...');
    const req = await addItem(formData && formData);
    if (req.status === 201) {
      toast.dismiss();
      toast.success('آیتم با موفقیت افزوده شد');
      methods.reset();
    }
  };

  useEffect(() => {
    if (categories) {
      const categoryOptionArr = [];
      categories.forEach((eachCategory) => {
        const categoryOption = {};
        categoryOption['id'] = eachCategory._id;
        categoryOption['name'] = eachCategory[language].name;
        return categoryOptionArr.push(categoryOption);
      });
      categoryOptionArr && setCategoryBoxOptions(categoryOptionArr);
    }
  }, [categories, language]);

  useEffect(() => {
    if (categories) {
      const choosedCategoryId = methods.getValues('category');
      if (choosedCategoryId !== '0') {
        categories.forEach((eachCategory) => {
          if (eachCategory._id === choosedCategoryId) {
            setSubCategoryBoxOptions(eachCategory[language].subCategory);
          }
        });
      } else {
        setSubCategoryBoxOptions(false);
      }
    }
  }, [methods.watch('category')]);
  return (
    <MainSection sectionTitle={'افزودن آیتم'}>
      <form encType='multipart/form-data'>
        {useMemo(() => {
          return (
            <ImageUploader
              methods={methods}
              label={'imageUploader'}
            />
          );
        }, [methods, methods.watch('image')])}
        <div className='grid grid-cols-1 pt-5 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'>
          {useMemo(() => {
            return addItemPageInputs.map((inputData) => {
              return (
                inputData.type !== 'selectBox' &&
                inputData.type !== 'file' &&
                inputData.type !== 'boolean' && (
                  <InputContainer
                    key={inputData.id}
                    options={inputData}
                    methods={methods}
                  />
                )
              );
            });
          }, [methods])}

          {categories && categoryBoxOptions && (
            <InputContainer
              methods={methods}
              options={addItemPageInputs[2]}
              boxOptions={categoryBoxOptions && categoryBoxOptions}
            />
          )}

          {subCategoryBoxOptions && (
            <InputContainer
              methods={methods}
              options={addItemPageInputs[3]}
              boxOptions={subCategoryBoxOptions && subCategoryBoxOptions}
            />
          )}
        </div>
        <ExteraItems />
        {useMemo(() => {
          return (
            <FormButton
              formState={methods.formState}
              ctaButton={{
                title: 'افزودن آیتم',
                handler: submitFormHandler,
              }}
            />
          );
        }, [methods.formState])}
      </form>
    </MainSection>
  );
}

function ExteraItems() {
  const [extraInputs, setExtraInputs] = useState([]);
  const randomIdContainer = useId();
  const randomIdInputs = useId();
  useEffect(() => {
    console.log(extraInputs);
  }, [extraInputs]);
  return (
    <>
      <div className='w-full flex flex-col gap-y-10 mt-10'>
        <div className='w-full h-auto flex gap-x-3 items-center'>
          <h1 className='text-typography-700 font-bold tracking-none'>
            تگ ها
          </h1>
          <button
            type='button'
            onClick={async () =>
              setExtraInputs((prev) => [
                ...prev,
                [
                  {
                    type: 'text',
                    name: `title-${prev.length}`,
                    placeholder: 'amir',
                  },
                  {
                    type: 'text',
                    name: `price-${prev.length}`,
                    placeholder: 'hoof',
                  },
                ],
              ])
            }
            className='primary-button flex items-center h-8 px-3 border-primary-500 text-primary-500 border'>
            افزودن
          </button>
        </div>
        <div className='w-full h-auto flex gap-x-3 items-center'>
          <h1 className='text-typography-700 font-bold tracking-none'>
            آیتم اضافی
          </h1>
          <button
            type='button'
            onClick={async () =>
              setExtraInputs((prev) => [
                ...prev,
                [
                  {
                    type: 'text',
                    name: `title-${prev.length}`,
                    placeholder: 'amir',
                  },
                  {
                    type: 'text',
                    name: `price-${prev.length}`,
                    placeholder: 'hoof',
                  },
                ],
              ])
            }
            className='primary-button flex items-center h-8 px-3 border-primary-500 text-primary-500 border'>
            افزودن
          </button>
        </div>

        {extraInputs &&
          extraInputs.map((eachExtraInputData, indexContainer) => {
            return (
              <div
                key={randomIdContainer}
                className='w-full md:w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5'>
                <input
                  key={randomIdInputs}
                  className='primary-input w-full'
                />
              </div>
            );
          })}
      </div>
    </>
  );
}

function AddItemsWithExcel() {
  const methods = useForm({
    defaultValues: {
      excelFile: '',
    },
  });
  const FileSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('excel-file', methods.getValues('excelFile')[0]);
    addItemWithExcel(formData);
  };
  return (
    <MainSection sectionTitle='افزودن آیتم با فایل'>
      <form encType='multipart/form-data'>
        {useMemo(() => {
          return (
            <InputContainer
              methods={methods}
              options={addItemPageInputs[addItemPageInputs.length - 1]}
            />
          );
        }, [methods])}
      </form>
      <FormButton
        formState={methods.formState}
        ctaButton={{ title: 'آپلود فایل', handler: FileSubmitHandler }}
      />
    </MainSection>
  );
}

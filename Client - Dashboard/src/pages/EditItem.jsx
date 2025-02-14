import { useContext, useEffect, useMemo, useState } from 'react';

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
// import BouncingLoader from '../components/Loaders/Bouncing';
import InputContainer from '../components/Input/InputContainer';
import ImageUploader from '../components/Containers/ImageUploader';

// Utils
import urlFunctions from '../utils/urlFunctions';
import useReactQuery from '../hooks/useReactQuery';
import { useNavigate } from 'react-router-dom';
import { editItem, getSingleItem } from '../services/Axios/Requests/Items';
import Toggle from '../components/Toggle/Toggle';
import { itemSchema } from '../validators/ItemSchema';

export default function EditItem() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const itemId = urlFunctions.getParamsFromUrl('id');
  const { mainData: categories } = useReactQuery('Categories', getCategories);
  const [categoryBoxOptions, setCategoryBoxOptions] = useState(false);
  const [subCategoryBoxOptions, setSubCategoryBoxOptions] = useState(false);
  //   const itemName = urlFunctions.removeDashedPathname(2);

  const { mainData: items } = useReactQuery(['items', itemId], getSingleItem, {
    itemId,
  });

  const methods = useForm({
    defaultValues: {
      name: '',
      price: '',
      category: '0',
      subCategory: '0',
      image: '',
      cardDescription: '',
      discount: '0',
      available: true,
      hideItem: false,
    },
    // resolver: yupResolver(itemSchema),
  });

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
  }, [categories]);

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
  }, [methods.getValues('category')]);

  useEffect(() => {
    if (items) {
      methods.setValue('name', items[language].name, {
        shouldValidate: true,
      });
      methods.setValue('price', items.price, {
        shouldValidate: true,
      });
      methods.setValue('category', items.category._id, {
        shouldValidate: true,
      });
      methods.setValue('subCategory', items[language].subCategory, {
        shouldValidate: true,
      });
      methods.setValue('image', items.image, {
        shouldValidate: true,
      });
      methods.setValue('cardDescription', items[language].cardDescription, {
        shouldValidate: true,
      });
      methods.setValue('discount', items.discount, {
        shouldValidate: true,
      });
      methods.setValue('available', items.available, {
        shouldValidate: true,
      });
      methods.setValue('hideItem', items.hideItem, {
        shouldValidate: true,
      });
    }
  }, [items]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = methods.getValues();
    const formData = new FormData();
    const changedField = Object.keys(methods.formState.dirtyFields);
    formData.append('language', language);
    if (changedField.length === 1) {
      if (changedField[0] === 'image') {
        formData.append(`item-image`, data[changedField][0]);
      } else {
        if (
          changedField[0] === 'name' ||
          changedField[0] === 'subCategory' ||
          changedField[0] === 'cardDescription'
        ) {
          formData.append(
            `${language}${
              changedField[0].charAt(0).toUpperCase() + changedField[0].slice(1)
            }`,
            data[changedField],
          );
        } else {
          formData.append(`${changedField}`, data[changedField]);
        }
      }
    } else {
      changedField.forEach((eachChangedData) => {
        if (eachChangedData === 'image') {
          formData.append(`item-image`, data[eachChangedData][0]);
        } else {
          if (
            eachChangedData === 'name' ||
            eachChangedData === 'subCategory' ||
            eachChangedData === 'cardDescription'
          ) {
            formData.append(
              `${language}${
                eachChangedData.charAt(0).toUpperCase() +
                eachChangedData.slice(1)
              }`,
              data[eachChangedData],
            );
          } else {
            formData.append(`${eachChangedData}`, data[eachChangedData]);
          }
        }
      });
    }
    toast.loading('درحال ویرایش آیتم ...');
    const req = await editItem({ itemId, itemData: formData && formData });
    if (req.status === 200) {
      toast.dismiss();
      toast.success('آیتم با موفقیت ویرایش شد');
      navigate('/items');
    }
  };

  const changeHideItemHandler = async (e) => {
    toast.success('درحال ویرایش آیتم ...');
    const req = await editItem({ itemId, itemData: { hideItem: e } });
    if (req.status === 200) {
      toast.dismiss();
      toast.success('آیتم با موفقیت ویرایش شد');
      navigate('/items');
    }
  };

  const changeAvailableHandler = async (e) => {
    toast.success('درحال ویرایش آیتم ...');
    const req = await editItem({ itemId, itemData: { available: e } });
    if (req.status === 200) {
      toast.dismiss();
      toast.success('آیتم با موفقیت ویرایش شد');
      navigate('/items');
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

          <div className='grid grid-cols-1 pt-5 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'>
            {useMemo(() => {
              return addItemPageInputs.map((inputData) => {
                return (
                  inputData.type !== 'selectBox' &&
                  inputData.type !== 'boolean' &&
                  inputData.type !== 'file' && (
                    <InputContainer
                      key={inputData.id}
                      options={inputData}
                      methods={methods}
                    />
                  )
                );
              });
            }, [methods.getValues('name')])}

            {useMemo(() => {
              return (
                categories &&
                categoryBoxOptions && (
                  <InputContainer
                    methods={methods}
                    options={addItemPageInputs[2]}
                    boxOptions={categoryBoxOptions && categoryBoxOptions}
                  />
                )
              );
            }, [categoryBoxOptions])}

            {useMemo(() => {
              return (
                subCategoryBoxOptions && (
                  <InputContainer
                    methods={methods}
                    options={addItemPageInputs[3]}
                    boxOptions={subCategoryBoxOptions && subCategoryBoxOptions}
                  />
                )
              );
            }, [subCategoryBoxOptions, categoryBoxOptions])}
          </div>

          <div className='w-full h-20 mt-10 flex flex-col gap-5 px-3'>
            <div className='flex gap-x-5 w-auto items-center'>
              <p className='font-bold text-typography-500'>آیتم موجود است :</p>
              <Toggle
                changeToggleHandler={changeAvailableHandler}
                methods={methods}
                toggleName={'available'}
                defaultStatus={methods.getValues('availabe')}
              />
            </div>
            <div className='flex gap-x-5 w-auto items-center'>
              <p className='font-bold text-typography-500 ml-1'>
                پنهان سازی آیتم :
              </p>
              <Toggle
                changeToggleHandler={changeHideItemHandler}
                methods={methods}
                toggleName={'hideItem'}
                defaultStatus={methods.getValues('hideItem')}
              />
            </div>
          </div>

          {useMemo(() => {
            return (
              <FormButton
                formState={methods.formState}
                ctaButton={{ title: 'ویرایش آیتم', handler: onSubmit }}
              />
            );
          }, [methods.formState])}
        </form>
      </MainSection>
    </>
  );
}

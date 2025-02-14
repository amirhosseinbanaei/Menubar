import SelectBox from '../Containers/SelectBox';
import Input from './Input';
import InputLable from './InputLable';
// import { useCallback } from 'react';

function InputContainer({ methods, options, boxOptions = null, customInput }) {
  return (
    <div className='flex-1'>
      <InputLable label={options.name} />
      {!customInput &&
        (options.type !== 'selectBox' ? (
          <Input
            options={options}
            methods={methods}
          />
        ) : (
          <SelectBox
            options={options}
            methods={methods}
            boxOptions={boxOptions && boxOptions}
          />
        ))}
      {customInput && customInput}
      {/* {errors && (
        <p className='text-red-500 text-xs mt-2 mr-2 tracking-none font-bold'>
          {errors}
        </p>
      )} */}
    </div>
  );
}
export default InputContainer;

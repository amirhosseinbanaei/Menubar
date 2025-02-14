import { memo } from 'react';

const FormButton = memo(function FormButton({ formState, ctaButton }) {
  return (
    <div className='w-full h-auto flex flex-col items-end my-5'>
      <button
        type='submit'
        onClick={(e) => ctaButton.handler(e)}
        disabled={
          !formState.isDirty || !formState.isValid || formState.isSubmitting
        }
        className={`primary-button bg-blue-500 text-white ${
          formState.isSubmitting || !formState.isValid || !formState.isDirty
            ? 'opacity-75'
            : null
        }`}>
        {ctaButton.title}
      </button>
    </div>
  );
});

export default FormButton;

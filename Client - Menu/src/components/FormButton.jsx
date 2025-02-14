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
        className={`inline-block px-12 py-3 font-bold tracking-none leading-normal text-center  align-middle transition-all ease-in border-0 rounded-lg cursor-pointer text-xs hover:shadow-xs hover:-translate-y-px active:opacity-85 bg-primary-500 text-white ${
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

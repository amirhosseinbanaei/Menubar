export function PrimaryButton({ handler, buttonValue }) {
  return (
    <button
      type='button'
      onClick={() => handler && handler()}
      className='inline-block px-12 py-3 font-bold tracking-none leading-normal text-center  align-middle transition-all ease-in border-0 rounded-lg cursor-pointer text-xs hover:shadow-xs hover:-translate-y-px active:opacity-85 bg-primary-500 text-white'>
      {buttonValue && buttonValue}
    </button>
  );
}

export function SecondaryButton({ handler, buttonValue }) {
  return (
    <button
      type='button'
      onClick={() => handler && handler()}
      className='inline-block px-12 py-3 font-bold tracking-none leading-normal text-center  align-middle transition-all ease-in border rounded-lg cursor-pointer text-xs hover:shadow-xs hover:-translate-y-px active:opacity-85 border-primary-500 text-primary-500'>
      {buttonValue && buttonValue}
    </button>
  );
}

export function PureButton({ handler, buttonValue, customStyle }) {
  return (
    <button
      type='button'
      onClick={() => handler && handler()}
      className={`inline-block font-bold tracking-none leading-normal text-center align-middle transition-all ease-in cursor-pointer text-xs hover:shadow-xs hover:-translate-y-px active:opacity-85 ${customStyle}`}>
      {buttonValue && buttonValue}
    </button>
  );
}

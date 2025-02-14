export default function SecondaryButton({ handler, buttonValue }) {
  return (
    <button
      type='button'
      onClick={() => handler && handler()}
      className='px-12 w-full py-3 font-bold border text-xs rounded-lg border-primary-500 text-primary-500'>
      {buttonValue && buttonValue}
    </button>
  );
}

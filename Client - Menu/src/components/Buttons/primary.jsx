export default function PrimaryButton({ handler, buttonValue }) {
  return (
    <button
      type='button'
      onClick={() => handler && handler()}
      className='px-12 py-3 border-0 rounded-lg cursor-pointer tracking-none font-bold text-xs hover:shadow-xs bg-primary-500 text-white'>
      {buttonValue && buttonValue}
    </button>
  );
}

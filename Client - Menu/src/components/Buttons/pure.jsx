export default function PureButton({ handler, buttonValue, customStyle }) {
  return (
    <button
      type='button'
      onClick={() => handler && handler()}
      className={`base-button-style ${customStyle}`}>
      {buttonValue && buttonValue}
    </button>
  );
}

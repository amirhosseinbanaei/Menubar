export default function IconButton({ handler, icon, customStyle }) {
  return (
    <button
      type='button'
      onClick={() => handler && handler()}
      className={`base-button-style p-3 ${customStyle}`}>
      {icon}
    </button>
  );
}

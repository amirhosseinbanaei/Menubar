export default function NoticeContainer({ children }) {
  return (
    <div className='w-full h-[500px] relative flex flex-col gap-y-10 items-center justify-center bg-white shadow-xl rounded-2xl'>
      {children}
    </div>
  );
}

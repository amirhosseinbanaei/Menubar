export default function TableHeadRow({ title }) {
  return (
    <th className='py-3 w-4/12 text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none text-sm border-b-solid tracking-none whitespace-nowrap text-typography-500'>
      {title}
    </th>
  );
}

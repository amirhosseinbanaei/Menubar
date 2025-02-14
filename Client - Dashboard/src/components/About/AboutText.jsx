import MainSection from '../../layouts/MainSection';
import TextEditor from '../Input/TextEditor';
export default function AboutText() {
  return (
    <MainSection sectionTitle='درباره مجموعه'>
      {/* <textarea className='block h-96 resize-none text-sm w-full px-5 py-3 text-typography-700 placeholder:text-typography-500 placeholder:text-sm focus:ring-0 bg-white border border-gray-200 rounded-xl focus:outline-primary-500'></textarea> */}
      <TextEditor />
    </MainSection>
  );
}

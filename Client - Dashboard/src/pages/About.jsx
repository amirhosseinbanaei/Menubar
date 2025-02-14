import WorkingHours from '../components/About/workingHours';
import AboutText from '../components/About/AboutText';
import Socials from '../components/About/Socials';

export default function About() {
  // const editHandler = async (e) => {
  //   e.preventDefault();
  //   console.log(methods.getValues());
  //   const req = await addProjectData(methods.getValues());
  //   console.log(req);
  //   // const workingHours = {};

  //   // const daysOfWeek = [
  //   //   'Monday',
  //   //   'Tuesday',
  //   //   'Wednesday',
  //   //   'Thursday',
  //   //   'Friday',
  //   //   'Saturday',
  //   //   'Sunday',
  //   // ];

  //   // for (const day of daysOfWeek) {
  //   //   const openKey = `${day} O`;
  //   //   const closeKey = `${day} C`;
  //   //   const openValue = methods.getValues(openKey);
  //   //   const closeValue = methods.getValues(closeKey);
  //   //   workingHours[day] = {
  //   //     open: `${openValue}`,
  //   //     close: `${closeValue}`,
  //   //   };
  //   // }
  // };
  return (
    <div className='w-full pb-5'>
      <WorkingHours />
      <AboutText />
      <Socials />
    </div>
  );
}

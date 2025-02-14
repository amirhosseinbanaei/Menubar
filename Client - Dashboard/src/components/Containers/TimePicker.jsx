import SelectBox from './SelectBox';

export default function CustomTimePicker({ methods, options }) {
  const dayHours = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      dayHours.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return (
    <div>
      <SelectBox
        methods={methods}
        options={options}
        boxOptions={dayHours && dayHours}
      />
    </div>
  );
}

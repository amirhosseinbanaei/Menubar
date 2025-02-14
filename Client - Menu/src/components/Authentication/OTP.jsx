const OTPForm = ({ otp, setOTP }) => {
  const inputRefs = []; // An array to store references to input elements

  const handleChange = (event, index) => {
    const { value } = event.target;

    // Ensure the input value is a single digit
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;

      // Move to the next input field if a digit is entered
      if (value.length === 1 && index < 3) {
        inputRefs[index + 1].focus();
      }
      setOTP(newOTP);
    }
  };

  return (
    <div>
      {otp.map((digit, index) => (
        <div
          className='w-16 h-16 inline-block mx-2'
          key={index}>
          <input
            type='text'
            value={digit}
            onChange={(e) => handleChange(e, index)}
            maxLength='1'
            className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
            ref={(el) => (inputRefs[index] = el)}
          />
        </div>
      ))}
    </div>
  );
};

export default OTPForm;

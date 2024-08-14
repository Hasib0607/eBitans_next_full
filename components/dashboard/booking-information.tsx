const BookingInformation = ({ booking }: any) => {
  return (
    <>
      <p className="text-base font-semibold leading-4 text-center md:text-left  pb-2">
        Booking Information
      </p>
      {booking?.name && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 capitalize">
          <span className="font-semibold">Name: </span>
          {booking?.name}
        </p>
      )}
      {booking?.phone && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Phone: </span>
          {booking?.phone}
        </p>
      )}
      {booking?.email && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Email: </span>
          {booking?.email}
        </p>
      )}
      {booking?.date && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Date: </span>
          {booking?.date}
        </p>
      )}
      {booking?.time && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Time: </span>
          {booking?.time}
        </p>
      )}
      {booking?.start_date && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Start Date: </span>
          {booking?.start_date}
        </p>
      )}
      {booking?.end_date && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">End Date: </span>
          {booking?.end_date}
        </p>
      )}
      {booking?.pickup_location && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Pickup Location: </span>
          {booking?.pickup_location}
        </p>
      )}
      {booking?.drop_location && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Drop Location: </span>
          {booking?.drop_location}
        </p>
      )}
      {booking?.comment && (
        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
          <span className="font-semibold">Comment: </span>
          {booking?.comment}
        </p>
      )}
    </>
  );
};

export default BookingInformation;

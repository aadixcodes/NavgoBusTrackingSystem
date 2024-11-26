'use client';

const LiveTracking = () => {
  return (
    <div className="flex justify-center items-center w-full h-[90vh] overflow-hidden bg-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117676.79402006012!2d75.69719169726561!3d22.824693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963039c587a8091%3A0x206d00d7a5e4afb3!2sShri%20Vaishnav%20Vidyapeeth%20Vishwavidyalaya%20(SVVV)!5e0!3m2!1sen!2sin!4v1731337549893!5m2!1sen!2sin"
        width="100%"
        height="100%"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0"
      ></iframe>
    </div>
  );
};

export default LiveTracking;

const Modal = () => {
  return (
    <div
      className="absolute w-[90%] sm:w-[600px] h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex 
     z-10 bg-black rounded-lg text-white overflow-hidden flex-col"
    >
      <img src="awwwards.webp" className="object-cover fixed" />
      <div
        className=" absolute w-full bottom-0 h-[70%] flex flex-col  z-10"
        style={{
          background:
            "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 212, 255, 0.47) 33%, rgba(0, 212, 255, 1) 62%)",
        }}
      >
        <h1 className=" text-6xl p-2">Title</h1>
        <div>
          <p>tag </p>
          <p>tag </p>
          <p>tag </p>
          <p>tag </p>
          <p>tag </p>
          <p>tag </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

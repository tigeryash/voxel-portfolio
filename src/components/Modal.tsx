import { projects } from "../lib/constants";
import { useSignStore } from "../stores/useSignStore";

const Modal = () => {
  const { isModalOpen, signTitle, closeModal } = useSignStore();
  const signData = projects.find((project) => project.name === signTitle);

  return (
    isModalOpen && (
      <div className="inset-0 fixed z-10 bg-black/50 flex justify-center items-center">
        <div
          className=" w-[90%] sm:w-[600px] h-1/2 relative flex z-10bg-black rounded-lg text-white overflow-hidden flex-col"
          style={{
            background: signData?.background,
          }}
        >
          <button
            className="absolute top-3 right-3 p-2 z-10 bg-red-500/40 hover:bg-red-500/90 rounded-full w-8 h-8 flex items-center justify-center 
            text-white transition-colors"
            onClick={() => closeModal()}
          >
            X
          </button>
          <img
            src={signData?.image}
            className="object-cover w-full h-full brightness-80"
            alt={signData?.title || "Project image"}
          />

          <div
            className=" absolute w-full bottom-0 pt-12 space-y-3 h-[70%] flex flex-col 
             z-10 px-2 font-semibold text-zinc-100"
            style={{
              background: signData?.background,

              //   backdropFilter: "blur(20px)",
              //   WebkitBackdropFilter: "blur(20px)", // For Safari support
            }}
          >
            <div className="flex justify-between items-center">
              <h1 className=" text-6xl p-2 text-nowrap">{signData?.title}</h1>

              <div className="flex gap-2 pr-8 ">
                {signData?.github && (
                  <a
                    target="_blank"
                    href={signData?.github}
                    className="px-2 py-2 bg-zinc-700/80 hover:bg-zinc-100/80 rounded-lg bg"
                  >
                    <img src="/github.svg" alt="link togithub" />
                  </a>
                )}
                {signData?.link && (
                  <a
                    target="_blank"
                    href={signData?.link}
                    className="px-2 py-2 bg-zinc-700/80 hover:bg-zinc-100/80 rounded-lg bg"
                  >
                    <img src="/link.svg" alt="link to project" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex gap-2 px-4">
              {signData?.tags?.map((tag) => (
                <p key={tag} className="px-4 rounded-full bg-zinc-700/70">
                  {tag}
                </p>
              ))}
            </div>
            <p className="px-4">{signData?.description}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;

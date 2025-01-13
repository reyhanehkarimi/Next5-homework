
import { useRouter } from 'next/router';

const Modal = ({ params }) => {
  const { id } = params; 
  const router = useRouter();

  const image = {
    id,
    src: `https://via.placeholder.com/600?text=Image+${id}`,
    alt: `Image ${id}`,
  };

  const closeModal = () => {
    router.push('/gallery'); 
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-xl">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2"
        >
          X
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-96 object-contain"
        />
        <h2 className="mt-4 text-xl text-center">{image.alt}</h2>
      </div>
    </div>
  );
};

export default Modal; 

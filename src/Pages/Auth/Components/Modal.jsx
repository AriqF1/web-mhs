import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Event listener untuk tombol ESC
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose} // Klik luar modal untuk menutup
        >
            <div 
                className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
                onClick={(e) => e.stopPropagation()} // Hindari modal tertutup jika dalam modal diklik
            >
                <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                <button 
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default Modal;

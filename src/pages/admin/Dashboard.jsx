import React, { useState } from "react";
import Footer from "../components/layouts/Footer";
import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";
import Modal from "../components/organism/Modal";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
    setModalContent(null);
  };

  return (
    <div className="h-screen bg-gray-200">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 relative">
          <Header />

          {/* Modal di sini */}
          <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
            {modalContent}
          </Modal>

          {/* Outlet terima context biar child page bisa manggil modal */}
          <div className="flex-1 overflow-y-auto">
            <Outlet context={{ openModal }} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

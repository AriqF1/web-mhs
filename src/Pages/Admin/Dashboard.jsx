import React from "react";
import Footer from "../Layouts/Footer";
import Sidebar from "../Layouts/Sidebar";
import Header from "../Layouts/Header";
import { Outlet } from "react-router-dom";
const Dashboard = () => {  
    return (
    <body className="h-screen bg-gray-200">
        <div className="flex h-screen">
                <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                    <div>
                        <Outlet />
                    </div>
                <Footer />
            </div>
        </div>
    </body>
    )
};
export default Dashboard;
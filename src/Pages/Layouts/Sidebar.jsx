import React from "react";

const Sidebar = () => {
    return(
        <aside id="sidebar" class="bg-blue-800 text-white h-full transition-all duration-300 w-20 lg:w-64">
            <div class="flex justify-center items-center p-4 border-b border-blue-700">
                <span class="text-3xl font-bold hidden lg:block">Admin</span>
            </div>
            <nav class="p-4 space-y-2">
                <a href="#" class="flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700">
                    <span class="text-lg">🏠</span>
                    <span class="menu-text hidden lg:inline"><NavLink to="/admin/dashboard">Dashboard</NavLink></span>
                </a>
                <a href="#" class="flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700">
                    <span class="text-lg">🎓</span>
                    <span class="menu-text hidden lg:inline"><NavLink to="/admin/mahasiswa">Mahasiswa</NavLink></span>
                </a>
            </nav>
        </aside>
    );
};
export default Sidebar;
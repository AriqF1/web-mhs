import React from "react";

export default function Header (){
    return(
        <header class="bg-white shadow-md">
            <div class="flex justify-between items-center px-6 py-4">
                <h1 class="text-lg font-semibold text-gray-800">Mahasiswa</h1>
                <button onclick="toggleProfileMenu()">
                    <img src="profile.jpg" class="w-8 h-8 rounded-full bg-gray-300 focus:outline-none" alt="profile"/>
                </button>
                <div id="profileMenu" class="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 hidden">
                    <button onclick="logout()" class="block text-left px-4 py-2 text-gray-700 hover:bg-gray-200">Logout</button>
                </div>
            </div>
        </header>
    );
};
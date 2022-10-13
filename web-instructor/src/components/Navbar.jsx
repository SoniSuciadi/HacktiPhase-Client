import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [userMenu, changeUserMenu] = useState(false);
    const navigate = useNavigate()
    function toggleUserMenu() {
        userMenu ? changeUserMenu(false) : changeUserMenu(true);
    }
    function signOut() {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="py-3 px-3 lg:px-5 lg:pl-3">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center">
                        <a href="#" className="flex mr-14">
                            <img
                                src="https://cdn.discordapp.com/attachments/999583052097388684/1029987612754186311/hacktiphase_w.png"
                                className="ml-3 mr-3 h-8"
                                alt="FlowBite Logo"
                            />
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div>
                                <button
                                    onClick={toggleUserMenu}
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    id="user-menu-button-2"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown-2"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                                        <svg
                                            className="absolute -left-1 w-12 h-12 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>

                            {userMenu && <div className="absolute top-0 right-0 z-50 mr-4 my-16 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block" id="dropdown-2" data-popper-placement="bottom"
                                style={{
                                    // position: "absolute",
                                    // inset: "0px auto auto 0px",
                                    // margin: "0px",
                                    // transform: "translate3d(1301px, 63px, 0px)",
                                }}
                            >

                                <div className="py-3 px-4" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                        Ajat Darojat
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                        admin@gmail.com
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <button onClick={signOut} className="w-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</button>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

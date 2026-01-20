"use client"

import { usePopup } from "@libs/popups";
import dynamic from "next/dynamic";
import { FaRegAddressBook, FaTools, FaWindowMinimize } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineColorLens } from "react-icons/md";
import { PiSplitHorizontal } from "react-icons/pi";
import { TbMaximize } from "react-icons/tb";
import { VscCloseAll } from "react-icons/vsc";

const Loading = (
    <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
    </div>
);

const AddPersonComponent = dynamic(() => import("../person/addPerson"), {
    loading: () => Loading,
    ssr: false
});

const CheckListComponent = dynamic(() => import("../person/checkList"), {
    loading: () => Loading,
    ssr: false
});

const ThemesComponent = dynamic(() => import("../shared/themes"), {
    loading: () => Loading,
    ssr: false
});

export function Dock() {
    const { addPopup, closeAll, maximizeAll, minimizeAll, splitAll } = usePopup();
    
    return (
        <div className="dock">

            <button 
                onClick={
                    () => addPopup({ 
                        title: "Add new person", 
                        children: <AddPersonComponent />,
                    })
                }
            >
                <IoPersonAddOutline className="text-xl"/>
                <span className="dock-label">Add person</span>
            </button>

            <button 
                onClick={
                    () => addPopup({ 
                        title: "Check person list", 
                        children: <CheckListComponent />,
                    })
                }
            >
                <FaRegAddressBook className="text-xl"/>
                <span className="dock-label">Check List</span>
            </button>

            <button 
                onClick={
                    () => addPopup({ 
                        title: "Select theme", 
                        children: <ThemesComponent />,
                    })
                }
            >
                <MdOutlineColorLens className="text-xl"/>
                <span className="dock-label">Change theme</span>
            </button>

            <div>
                <div className="dropdown dropdown-top lg:dropdown-center dropdown-end w-full">
                    <div tabIndex={0} role="button" className="m-1 text-center">
                        <FaTools className="text-xl mx-auto"/>
                        <span className="dock-label">Tools</span>
                    </div>
                    <ul  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-7 shadow-sm gap-4">

                        <button className="btn btn-outline btn-error btn-sm" onClick={closeAll}>
                            <VscCloseAll className="text-lg" />
                            Close all
                        </button>

                        <button className="btn btn-outline btn-base btn-sm" onClick={splitAll}>
                            <PiSplitHorizontal className="text-lg" />
                            Split all
                        </button>

                        <button className="btn btn-outline btn-base btn-sm" onClick={minimizeAll}>
                            <FaWindowMinimize className="text-md" />
                            Minimize all
                        </button>

                        <button className="btn btn-outline btn-base btn-sm" onClick={maximizeAll}>
                            <TbMaximize className="text-md" />
                            Maximize all
                        </button>
                        
                    </ul>
                </div>
            </div>
            
        </div>
    );
}

export default Dock;

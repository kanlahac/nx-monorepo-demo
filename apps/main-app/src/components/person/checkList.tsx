"use client"

import { memo } from "react";
import { usePersonStore } from "../definitions/stores/person-store";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaRegFaceSadTear } from "react-icons/fa6";

export function CheckList() {
    console.log("Renderizando CheckList...");

    const { list, removePerson, removeAll } = usePersonStore();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {
                list.length === 0
                ?
                (
                    <div className="flex flex-col gap-6 items-center justify-center h-full">
                        <h1 className="text-4xl font-bold opacity-30">No persons</h1>
                        <h2 className="opacity-30">Click in Add person on the dock</h2>
                        <FaRegFaceSadTear className="text-5xl opacity-20"/>
                    </div>
                )
                :
                (
                    <>
                        <button
                            className="btn btn-sm btn-soft btn-error mb-5"
                            onClick={removeAll}
                        >
                            <IoIosRemoveCircleOutline className="text-xl" />
                            Delete all
                        </button>

                        <ul className="bg-base-100 rounded-box shadow-md w-full max-w-100">   
                            {
                                list.map((item, index) => (
                                    <li key={index} className="flex flex-wrap p-3 gap-4 items-center border-1 border-base-content/10">

                                        <div className="flex justify-center shrink-0 text-4xl font-thin opacity-30 tabular-nums text-center">
                                            { (index + 1).toString().padStart(2, '0') }
                                        </div>

                                        <div className="flex-grow shrink">
                                            <div className="text-lg font-bold capitalize">{ item.name }</div>
                                            <div className="text-xs capitalize font-semibold opacity-30">{ item.job }</div>
                                            <div className="text-xs capitalize opacity-30">{ item.color }</div>
                                        </div>

                                        <div className="flex justify-center sm:justify-end flex-grow">
                                            <button className="btn btn-square btn-soft btn-error" onClick={() => removePerson(item.id)}>
                                                <IoIosRemoveCircleOutline className="text-xl text-center" />
                                            </button>
                                        </div>

                                    </li>
                                ))
                            }                           
                        </ul>
                    </>
                )
            }
        </div>
    );
}

export default memo(CheckList);

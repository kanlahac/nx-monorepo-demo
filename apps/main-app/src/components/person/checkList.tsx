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
                        <h2 className="opacity-30">Select Add person from the dock</h2>
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

                        <div className="overflow-x-auto w-full">
                            <table className="table">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Job</th>
                                        <th>Favorite Color</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {   
                                        
                                        list.map((item, index) => (
                                            <tr key={item.id}>
                                                <th>{ index + 1 }</th>
                                                <td>{ item.name }</td>
                                                <td>{ item.job }</td>
                                                <td>{ item.color }</td>
                                                <td>
                                                    <button
                                                        className="btn btn-soft btn-error"
                                                        onClick={() => removePerson(item.id)}
                                                    >
                                                        <IoIosRemoveCircleOutline className="text-xl" />
                                                    </button>
                                                    
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default memo(CheckList);

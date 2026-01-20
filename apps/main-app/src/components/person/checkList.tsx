"use client"

import { memo } from "react";
import { usePersonStore } from "../definitions/stores/person-store";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export function CheckList() {
    console.log("Renderizando CheckList...");

    const { list, removePerson, removeAll } = usePersonStore();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">

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
        </div>
    );
}

export default memo(CheckList);

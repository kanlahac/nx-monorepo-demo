/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { FaArrowDown, FaCheckCircle, FaRegWindowClose, FaWindowMinimize } from "react-icons/fa";
import { PiSplitHorizontal } from "react-icons/pi";
import { TbMaximize } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { usePopup } from "./usePopup";
import { WidthProvider, Responsive } from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const PopupsProvider = () => {
    // Every mehtod and data from popup store abstraction used in this script
    const { 
        instances, 
        layout,
        gridMode,
        setInFront,
        setGridMode,
        updateLayout, 
        closePopup,
        maximizePopup, 
        splitPopup, 
        minimizePopup 
    } = usePopup();

    return (
        <div className="relative min-h-full w-full bg-base-200 overflow-x-hidden px-10 py-25">
            
            {/* Grid mode checkbox */}
            <div className="fixed z-10 opacity-60 top-5 text-center">
                <h5 className="font-bold">Grid mode</h5>

                <label className="toggle text-base-content mt-2">
                    <input type="checkbox" checked={gridMode} onChange={(e: any) => setGridMode(e.currentTarget.checked)} />
                    <FaCheckCircle />
                    <MdCancel />
                </label>
            </div>

            {
                // Check instances content
                instances.length === 0 
                ?
                ( 
                    // If instances is empty
                    <div className="flex flex-col gap-6 items-center justify-center h-[80vh]">
                        <h1 className="text-4xl font-bold opacity-30">Select a popup</h1>
                        <h2 className="opacity-30">From the dock</h2>
                        <FaArrowDown className="text-5xl opacity-20"/>
                    </div>
                )
                :
                ( 
                    // If instances have content print the grid system
                    <ResponsiveGridLayout 
                        layouts={{ lg: layout, md: layout, sm: layout }}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        margin={[20, 20]}
                        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
                        draggableHandle=".handle"
                        className="layout"
                        measureBeforeMount={true}
                        // This props change between grid or floating mode
                        allowOverlap={gridMode} 
                        compactType={!gridMode ? "horizontal" : null}

                        onLayoutChange={(current) => {
                            if (current) updateLayout(current);
                        }}
                        onDragStart={(layout, oldItem) => {
                            if (oldItem) setInFront(oldItem.i);
                        }}
                    >
                        {
                            instances.map((popup) => (
                                <div key={popup.id} className={popup.isInFront ? "z-1 shadow shadow-primary" : "z-0 shadown"} onClick={() => setInFront(popup.id)}>
                                    <div className="card bg-base-300 w-full h-full flex flex-col shadow-lg overflow-hidden">
                                        <div className="card-body">

                                            <div className="flex flex-wrap cursor-move">
                                                <div className="flex flex-wrap w-full h-full justify-center">

                                                    <div className="flex-1 h-full handle">
                                                        <div className="font-bold truncate h-full flex items-center">{popup.title}</div>
                                                    </div>
                                                    
                                                    <div className="flex gap-2">
                                                        <button className="btn btn-square btn-sm hidden xl:inline-flex" onClick={() => splitPopup(popup.id)}>
                                                            <PiSplitHorizontal className="text-lg" />
                                                        </button>
                                                        <button className="btn btn-square btn-sm " onClick={() => minimizePopup(popup.id)}>
                                                            <FaWindowMinimize className="text-md" />
                                                        </button>
                                                        <button className="btn btn-square btn-sm " onClick={() => maximizePopup(popup.id)}>
                                                            <TbMaximize className="text-lg" />
                                                        </button>
                                                        <button className="btn btn-square btn-sm " onClick={() => closePopup(popup.id)}>
                                                            <FaRegWindowClose className="text-lg" />
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="divider m-0 h-0"></div>

                                            <div className="mt-5 flex-1 overflow-auto">
                                                {popup.children}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </ResponsiveGridLayout>
                )
            }
           
        </div>
    );
}
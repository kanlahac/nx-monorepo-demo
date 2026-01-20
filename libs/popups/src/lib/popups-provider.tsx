"use client"

import { FaRegWindowClose, FaWindowMinimize } from "react-icons/fa";
import { PiSplitHorizontal } from "react-icons/pi";
import { TbMaximize } from "react-icons/tb";
import { usePopup } from "./usePopup";
import { WidthProvider, Responsive } from "react-grid-layout/legacy";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const PopupsProvider = () => {
    const { instances, layout, updateLayout, closePopup, maximizePopup, splitPopup, minimizePopup } = usePopup();

    return (
        <div className="relative min-h-full w-full bg-base-200 overflow-x-hidden p-10 pb-25">
            <ResponsiveGridLayout 
                layouts={{ lg: layout, md: layout, sm: layout }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
                draggableHandle=".handle"
                className="layout"
                compactType="horizontal"
                measureBeforeMount={false}
                allowOverlap={false}
                onLayoutChange={(current) => {
                    if (current) updateLayout(current);
                }}
            >
                {
                    instances.map((popup) => (
                        <div key={popup.id}>
                            <div className="card bg-base-300 w-full h-full flex flex-col shadow-lg overflow-hidden">
                                <div className="card-body">

                                    <div className="card-actions justify-end handle cursor-move">
                                        <div className="font-bold flex-grow h-full truncate">{popup.title}</div>
                                        <button className="btn btn-square btn-sm" onClick={() => splitPopup(popup.id)}>
                                            <PiSplitHorizontal className="text-lg" />
                                        </button>
                                        <button className="btn btn-square btn-sm" onClick={() => minimizePopup(popup.id)}>
                                            <FaWindowMinimize className="text-md" />
                                        </button>
                                        <button className="btn btn-square btn-sm" onClick={() => maximizePopup(popup.id)}>
                                            <TbMaximize className="text-lg" />
                                        </button>
                                        <button className="btn btn-square btn-sm" onClick={() => closePopup(popup.id)}>
                                            <FaRegWindowClose className="text-lg" />
                                        </button>
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
        </div>
    );
}
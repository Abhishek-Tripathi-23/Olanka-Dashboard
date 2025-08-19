import React, { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CommunicationTable from "./CommunicationTable/CommunicationTablePage";
import HorizontalBarChart from "./Graph/HorizontalBarChart";
import CommunicationTableFinance from "./CommunicationTableFinance/CommunicationTablePageFinance";
import { Sliders } from "lucide-react";


function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 2 : 0,
    cursor: "pointer",
  };

  return (
    <div ref={setNodeRef} style={style} className="cursor-pointer" {...attributes} {...listeners}>
      {children}
    </div>
  );
}

// Dropdown component
const TimePeriodDropdown = ({ onSelect, onClose }) => {
  const options = [
    "Last 2 Days",
    "Last Week",
    "Last Month",
    "Last 6 Months",
    "1 Year",
  ];
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 mt-1 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-50"
    >
      {options.map((option) => (
        <div
          key={option}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer first:rounded-t-md last:rounded-b-md"
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};


export const CombinedPage = () => {
  const [componentOrder, setComponentOrder] = useState([
    "comm-table",
    "bar-chart",
    "finance-table",
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Last 24 Hours");

  const components = {
    "comm-table": <CommunicationTable />,
    "bar-chart": <HorizontalBarChart />,
    "finance-table": <CommunicationTableFinance />,
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setComponentOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDropdownSelect = (option) => {
    setSelectedPeriod(option);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="bg-[#F0DCE3] px-3 py-3 lg:px-6 lg:py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
          <div className="min-w-0 relative">
            <h1 className="text-xs lg:text-lg font-semibold text-gray-900 truncate">
              Sales Activity - KPI
            </h1>
            <div className="flex gap-1 lg:gap-2 items-center relative">
              <span className="relative">
                <Sliders
                  className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600 flex-shrink-0 cursor-pointer hover:text-gray-800 transition-colors"
                  onClick={() => setDropdownOpen((v) => !v)}
                />
                {dropdownOpen && (
                  <TimePeriodDropdown
                    onSelect={handleDropdownSelect}
                    onClose={() => setDropdownOpen(false)}
                  />
                )}
              </span>
              <p className="text-xs lg:text-sm text-gray-600 whitespace-nowrap">
                {selectedPeriod}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-full px-2 py-1 lg:px-4 lg:py-2 flex items-center gap-2 lg:gap-3 shadow-sm mx-2 lg:mx-0 flex-shrink-0">
          <div className="w-5 h-5 lg:w-8 lg:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs lg:text-sm">V</span>
          </div>
          <span className="text-gray-900 font-medium text-xs lg:text-lg whitespace-nowrap hidden sm:inline">
            Team Victorious
          </span>
          <span className="text-gray-900 font-medium text-xs sm:hidden">
            Team V
          </span>
        </div>
        <div className="flex items-center gap-2 lg:gap-3 flex-1 justify-end min-w-0">
          <span className="text-gray-900 font-medium text-xs lg:text-base hidden sm:inline">
            This Month
          </span>
          <span className="text-gray-900 font-medium text-xs sm:hidden">
            Month
          </span>
          <Sliders className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600 flex-shrink-0" />
        </div>
      </div>

      {/* Draggable Components Section */}
      <div className="flex flex-col gap-4 lg:flex-1 lg:grid lg:grid-flow-col 2xl:justify-around sm:auto-cols-max lg:gap-10 overflow-x-auto p-6 bg-[#F0DCE3] w-full min-h-screen">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={componentOrder}
            strategy={verticalListSortingStrategy}
          >
            {componentOrder.map((id) => (
              <SortableItem id={id} key={id}>
                {components[id]}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Sliders, ChevronDown } from "lucide-react";
import CommunicationTable from "./CommunicationTable/CommunicationTablePage";
import HorizontalBarChart from "./Graph/HorizontalBarChart";
import CommunicationTableFinance from "./CommunicationTableFinance/CommunicationTablePageFinance";
import { fetchAssistantManagers } from "../services/apiService";

function SortableItem({ id, children, className = "" }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition, // Only change: disable transition during drag
    opacity: isDragging ? 0.3 : 1, // Only change: reduce opacity instead of hiding
    zIndex: isDragging ? 2 : 0,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} className={`cursor-grab touch-none select-none ${className}`} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

// Dropdown component
const TimePeriodDropdown = ({ onSelect, onClose }) => {
  const options = [
    "Last 24h",
    "Yesterday",
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

// Team Dropdown component
const TeamDropdown = ({ teams, onSelect, onClose, selectedTeam }) => {
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
      className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50"
    >
      {teams.map((team) => (
        <div
          key={team.id}
          className={`px-4 py-2 text-sm cursor-pointer first:rounded-t-md last:rounded-b-md ${selectedTeam?.id === team.id
            ? "bg-teal-50 text-teal-700 font-medium"
            : "text-gray-700 hover:bg-gray-100"
            }`}
          onClick={() => onSelect(team)}
        >
          {team.name}
        </div>
      ))}
    </div>
  );
};

// Right Filter Dropdown component
const RightFilterDropdown = ({ onSelect, onClose, selectedPeriod }) => {
  const options = [
    "Last 24h",
    "This week",
    "This month",
    "This year",
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
      className="absolute top-full right-0 mt-1 w-36 bg-white shadow-lg rounded-md border border-gray-200 z-50"
    >
      {options.map((option) => (
        <div
          key={option}
          className={`px-4 py-2 text-sm cursor-pointer first:rounded-t-md last:rounded-b-md ${selectedPeriod === option
            ? "bg-teal-50 text-teal-700 font-medium"
            : "text-gray-700 hover:bg-gray-100"
            }`}
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
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [rightFilterOpen, setRightFilterOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Last 24h");
  const [selectedRightPeriod, setSelectedRightPeriod] = useState("This month");
  const [assistantManagers, setAssistantManagers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    viewportRatio: 0
  });

  const components = {
    "comm-table": <CommunicationTable selectedPeriod={selectedPeriod} selectedRightPeriod={selectedRightPeriod} selectedTeam={selectedTeam} />,
    "bar-chart": <HorizontalBarChart selectedTeam={selectedTeam} selectedRightPeriod={selectedRightPeriod} />,
    "finance-table": <CommunicationTableFinance selectedPeriod={selectedPeriod} selectedRightPeriod={selectedRightPeriod} selectedTeam={selectedTeam} />,
  };

  // Fetch assistant managers on component mount
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetchAssistantManagers();
        if (response.success && response.data) {
          setAssistantManagers(response.data);
          // Set first manager as default selection
          if (response.data.length > 0 && !selectedTeam) {
            setSelectedTeam(response.data[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching assistant managers:', error);
      }
    };

    fetchManagers();
  }, [selectedTeam]);

  // Add useEffect to track dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const viewportRatio = (width / height).toFixed(2);

      setDimensions({
        width,
        height,
        viewportRatio
      });
    };

    // Initial measurement
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Slightly increased from 3 to prevent accidental drags
      }
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setComponentOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDropdownSelect = (option) => {
    setSelectedPeriod(option);
    setDropdownOpen(false);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setTeamDropdownOpen(false);
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
          <div className="w-5 h-5 lg:w-8 lg:h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs lg:text-sm">
              {selectedTeam?.name?.charAt(0) || 'T'}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1 relative">
              <span
                className="text-gray-900 font-medium text-xs lg:text-lg whitespace-nowrap hidden sm:inline cursor-pointer hover:text-teal-600 transition-colors"
                onClick={() => setTeamDropdownOpen(!teamDropdownOpen)}
              >
                {selectedTeam?.name || 'Select Team'}
              </span>
              <ChevronDown
                className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600 cursor-pointer hover:text-teal-600 transition-colors hidden sm:inline"
                onClick={() => setTeamDropdownOpen(!teamDropdownOpen)}
              />
              {teamDropdownOpen && (
                <TeamDropdown
                  teams={assistantManagers}
                  onSelect={handleTeamSelect}
                  onClose={() => setTeamDropdownOpen(false)}
                  selectedTeam={selectedTeam}
                />
              )}
            </div>
          </div>
          <span
            className="text-gray-900 font-medium text-xs sm:hidden cursor-pointer"
            onClick={() => setTeamDropdownOpen(!teamDropdownOpen)}
          >
            {selectedTeam?.name?.split(' ')[0] || 'Team'} ▼
          </span>
        </div>
        <div className="flex items-center gap-2 lg:gap-3 flex-1 justify-end min-w-0 relative">
          <span
            className="text-gray-900 font-medium text-xs lg:text-base hidden sm:inline cursor-pointer hover:text-teal-600 transition-colors"
            onClick={() => setRightFilterOpen(!rightFilterOpen)}
          >
            {selectedRightPeriod}
          </span>
          <span
            className="text-gray-900 font-medium text-xs sm:hidden cursor-pointer"
            onClick={() => setRightFilterOpen(!rightFilterOpen)}
          >
            {selectedRightPeriod.split(' ')[1] || selectedRightPeriod} ▼
          </span>
          <Sliders
            className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600 flex-shrink-0 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => setRightFilterOpen(!rightFilterOpen)}
          />
          {rightFilterOpen && (
            <RightFilterDropdown
              onSelect={(option) => {
                setSelectedRightPeriod(option);
                setRightFilterOpen(false);
              }}
              onClose={() => setRightFilterOpen(false)}
              selectedPeriod={selectedRightPeriod}
            />
          )}
        </div>
      </div>

      {/* Draggable Components Section - KEPT YOUR ORIGINAL LAYOUT */}
      <div className="flex flex-col gap-4 md:grid md:grid-flow-col md:auto-cols-max md:gap-10 2xl:justify-around overflow-x-auto p-6 bg-[#F0DCE3] w-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={componentOrder}
            strategy={rectSortingStrategy}
          >
            {componentOrder.map((id) => (
              <SortableItem id={id} key={id} className="  ">
                {components[id]}
              </SortableItem>
            ))}
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <div
                className="cursor-grabbing pointer-events-none opacity-80"
                style={{
                  transform: 'rotate(1deg)', // Subtle rotation for visual feedback
                }}
              >
                {components[activeId]}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./busboard.module.css";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

const BusBoard = () => {
  const [busData, setBusData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShift, setSelectedShift] = useState("Shift 1");
  const [editingBus, setEditingBus] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [busToDelete, setBusToDelete] = useState(null);
  // const [isShiftSelectionModalOpen, setIsShiftSelectionModalOpen] =
  //   useState(false);
  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false);
  // const [selectedAddShift, setSelectedAddShift] = useState("");
  const [availableBuses, setAvailableBuses] = useState([]);

  useEffect(() => {
    const fetchBusData = async () => {
      setIsLoading(true);
      try {
        // Simulating API call with mock data
        const mockData = {
          "Shift 1": [
            {
              id: 1,
              busUniversityNumber: "01",
              routeName: "College to Indore",
              driverName: "Raja Babu",
              driverNumber: "232323",
              departureTime: "03:00 PM",
            },
            {
              id: 2,
              busUniversityNumber: "02",
              routeName: "College to Ujjain",
              driverName: "Ravi Kumar",
              driverNumber: "454545",
              departureTime: "03:00 PM",
            },
          ],
          "Shift 2": [
            {
              id: 3,
              busUniversityNumber: "03",
              routeName: "College to Bhopal",
              driverName: "Suresh Patel",
              driverNumber: "676767",
              departureTime: "05:00 PM",
            },
            {
              id: 4,
              busUniversityNumber: "04",
              routeName: "College to Dewas",
              driverName: "Amit Singh",
              driverNumber: "898989",
              departureTime: "05:00 PM",
            },
          ],
        };
        setBusData(mockData);
      } catch (error) {
        console.error("Error fetching bus data:", error);
        setBusData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusData();
  }, []);

  useEffect(() => {
    // Simulating fetching available buses from the view route page
    const mockAvailableBuses = [
      { busNumber: "01", route: "College to Indore" },
      { busNumber: "02", route: "College to Ujjain" },
      { busNumber: "03", route: "College to Bhopal" },
      { busNumber: "04", route: "College to Dewas" },
      { busNumber: "05", route: "College to Ratlam" },
      { busNumber: "06", route: "College to Sagar" },
    ];
    setAvailableBuses(mockAvailableBuses);
  }, []);

  const filteredBusData =
    busData[selectedShift]?.filter((bus) =>
      Object.values(bus).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) || [];

    const handleAddRowClick = () => {
      setIsAddBusModalOpen(true);
    };

  // const handleShiftSelectionNext = () => {
  //   setIsShiftSelectionModalOpen(false);
  //   setIsAddBusModalOpen(true);
  // };

  const handleAddBus = (bus) => {
    // Create new bus entries for both shifts with different timings
    const shift1Bus = {
      id: Date.now(),
      busUniversityNumber: bus.busNumber,
      routeName: bus.route,
      driverName: "TBA",
      driverNumber: "TBA",
      departureTime: "03:00 PM",
    };

    const shift2Bus = {
      id: Date.now() + 1, // Add 1 to ensure unique ID
      busUniversityNumber: bus.busNumber,
      routeName: bus.route,
      driverName: "TBA",
      driverNumber: "TBA",
      departureTime: "05:00 PM",
    };
    setBusData((prevData) => ({
      ...prevData,
      "Shift 1": [...(prevData["Shift 1"] || []), shift1Bus],
      "Shift 2": [...(prevData["Shift 2"] || []), shift2Bus],
    }));
    setIsAddBusModalOpen(false);
  };

  const handleEditClick = (bus) => {
    setEditingBus({ ...bus });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (bus) => {
    setBusToDelete(bus);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    setBusData((prevData) => ({
      ...prevData,
      [selectedShift]: prevData[selectedShift].map((bus) =>
        bus.id === editingBus.id ? editingBus : bus
      ),
    }));
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setBusData((prevData) => ({
      ...prevData,
      [selectedShift]: prevData[selectedShift].filter(
        (bus) => bus.id !== busToDelete.id
      ),
    }));
    setIsDeleteModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading bus board...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/Navgo" className={styles.backButton}>
          <FaArrowLeft />
        </Link>
        <h1 className="text-[25px] font-[600]">Bus Board</h1>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
        {/* <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className={styles.shiftSelect}
        >
          <option value="Shift 1">Shift 1</option>
          <option value="Shift 2">Shift 2</option>
        </select>
        <button onClick={handleAddRowClick} className={styles.addRowButton}>
          Add Row
        </button> */}
      </div>

      {/* <h2 className={styles.shiftHeading}>{selectedShift} Bus Board</h2> */}
      <div className='flex justify-between mb-[10px]'>
      <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className={styles.shiftSelect}
        >
          <option value="Shift 1">Shift 1</option>
          <option value="Shift 2">Shift 2</option>
        </select>
        <button onClick={handleAddRowClick} className={styles.addRowButton}>
          Add Row
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.busTable}>
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Driver Name</th>
              <th>Contact Number</th>
              <th>Departure Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBusData.length > 0 ? (
              filteredBusData.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.busUniversityNumber}</td>
                  <td>{bus.routeName}</td>
                  <td>{bus.driverName}</td>
                  <td>{bus.driverNumber}</td>
                  <td>{bus.departureTime}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(bus)}
                      className={styles.editButton}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(bus)}
                      className={styles.deleteButton}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No bus data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* {isShiftSelectionModalOpen && (
        <div className={styles.modal}>
          <div
            className={`${styles.modalContent} ${styles.shiftSelectionModal}`}
          >
            <h2>In Which Shift You Want to add Bus</h2>
            <div className={styles.shiftSelectionOptions}>
              <div className={styles.shiftOption}>
                <input
                  type="radio"
                  id="shift1"
                  value="Shift 1"
                  checked={selectedAddShift === "Shift 1"}
                  onChange={() => setSelectedAddShift("Shift 1")}
                />
                <label htmlFor="shift1">
                  <span>Shift</span>1
                </label>
              </div>
              <div className={styles.shiftOption}>
                <input
                  type="radio"
                  id="shift2"
                  value="Shift 2"
                  checked={selectedAddShift === "Shift 2"}
                  onChange={() => setSelectedAddShift("Shift 2")}
                />
                <label htmlFor="shift2">
                  <span>Shift</span>2
                </label>
              </div>
            </div>
            <div className={styles.modalButtons}>
              <button onClick={() => setIsShiftSelectionModalOpen(false)}>
                Cancel
              </button>
              <button
                onClick={handleShiftSelectionNext}
                disabled={!selectedAddShift}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )} */}

{isAddBusModalOpen && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add Bus to Board</h2>
        <table className={styles.addBusTable}>
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableBuses.map((bus) => (
              <tr key={bus.busNumber}>
                <td>{bus.busNumber}</td>
                <td>{bus.route}</td>
                <td>
                  <button
                    onClick={() => handleAddBus(bus)}
                    className={styles.addBusButton}
                  >
                    Add Bus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.modalButtons}>
          <button onClick={() => setIsAddBusModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}

      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Row Data</h2>
            <form>
              <label>
                Bus Number:
                <input
                  type="text"
                  value={editingBus.busUniversityNumber}
                  onChange={(e) =>
                    setEditingBus({
                      ...editingBus,
                      busUniversityNumber: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Route:
                <input
                  type="text"
                  value={editingBus.routeName}
                  onChange={(e) =>
                    setEditingBus({ ...editingBus, routeName: e.target.value })
                  }
                />
              </label>
              <label>
                Driver Name:
                <input
                  type="text"
                  value={editingBus.driverName}
                  onChange={(e) =>
                    setEditingBus({ ...editingBus, driverName: e.target.value })
                  }
                />
              </label>
              <label>
                Contact Number:
                <input
                  type="text"
                  value={editingBus.driverNumber}
                  onChange={(e) =>
                    setEditingBus({
                      ...editingBus,
                      driverNumber: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Departure Time:
                <input
                  type="text"
                  value={editingBus.departureTime}
                  onChange={(e) =>
                    setEditingBus({
                      ...editingBus,
                      departureTime: e.target.value,
                    })
                  }
                />
              </label>
              <div className={styles.modalButtons}>
                <button type="button" onClick={handleSaveEdit}>
                  Save
                </button>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this row?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusBoard;

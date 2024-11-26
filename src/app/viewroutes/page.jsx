'use client';

import styles from './viewroute.module.css'

// import React, { useState } from 'react';
// import { FiChevronDown, FiChevronUp, FiPlus, FiX } from 'react-icons/fi';
// // import styles from './ViewRoutes.module.css';

// const ViewRoutes = () => {
//   const [routes, setRoutes] = useState([]);
//   const [openAccordion, setOpenAccordion] = useState(null);
//   const [isAddingBus, setIsAddingBus] = useState(false);
//   const [selectedShift, setSelectedShift] = useState('Shift 1');
//   const [busDetails, setBusDetails] = useState({
//     busNumber: '',
//     driverName: '',
//     contactNumber: '',
//     startingPoint: '',
//     endingPoint: '',
//     stops: [{ name: '', time: '' }]
//   });

//   const toggleAccordion = (index) => {
//     setOpenAccordion(openAccordion === index ? null : index);
//   };

//   const handleAddBus = () => {
//     setIsAddingBus(true);
//   };

//   const handleShiftSelect = (e) => {
//     setSelectedShift(e.target.value);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBusDetails(prev => ({ ...prev, [name]: value }));
//   };

//   const handleStopChange = (index, field, value) => {
//     const newStops = [...busDetails.stops];
//     newStops[index][field] = value;
//     setBusDetails(prev => ({ ...prev, stops: newStops }));
//   };

//   const addStop = () => {
//     setBusDetails(prev => ({
//       ...prev,
//       stops: [...prev.stops, { name: '', time: '' }]
//     }));
//   };

//   const removeStop = (index) => {
//     const newStops = busDetails.stops.filter((_, i) => i !== index);
//     setBusDetails(prev => ({ ...prev, stops: newStops }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setRoutes(prev => [...prev, { ...busDetails, shift: selectedShift }]);
//     setIsAddingBus(false);
//     setBusDetails({
//       busNumber: '',
//       driverName: '',
//       contactNumber: '',
//       startingPoint: '',
//       endingPoint: '',
//       stops: [{ name: '', time: '' }]
//     });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>View Routes</h1>
//         {/* <div className={styles.actions}>
//           <select 
//             value={selectedShift} 
//             onChange={handleShiftSelect}
//             className={styles.select}
//           >
//             <option value="Shift 1">Shift 1</option>
//             <option value="Shift 2">Shift 2</option>
//           </select>
//           <button onClick={handleAddBus} className={styles.addButton}>
//             Add Bus
//           </button>
//         </div> */}
//       </div>
      
//         {/* <h2 className={styles.boardTitle}>{selectedShift} Bus Board</h2> */}
//         <div className='flex justify-between'>
//           <select 
//             value={selectedShift} 
//             onChange={handleShiftSelect}
//             className={styles.select}
//           >
//             <option value="Shift 1">Shift 1</option>
//             <option value="Shift 2">Shift 2</option>
//           </select>
//           <button onClick={handleAddBus} className={styles.addButton}>
//             Add Bus
//           </button>
//         </div>
//       <div className={styles.busBoard}>
//         {routes.length === 0 ? (
//           <p className={styles.noData}>No data available</p>
//         ) : (
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Bus Number</th>
//                 <th>Driver Name</th>
//                 <th>Contact Number</th>
//                 <th>Route</th>
//                 <th>Departure Time</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {routes.map((route, index) => (
//                 <React.Fragment key={index}>
//                   <tr>
//                     <td>{route.busNumber}</td>
//                     <td>{route.driverName}</td>
//                     <td>{route.contactNumber}</td>
//                     <td>{`${route.startingPoint} to ${route.endingPoint}`}</td>
//                     <td>{route.stops[0].time}</td>
//                     <td>
//                       <button onClick={() => toggleAccordion(index)} className={styles.detailsButton}>
//                         {openAccordion === index ? <FiChevronUp /> : <FiChevronDown />}
//                       </button>
//                     </td>
//                   </tr>
//                   {openAccordion === index && (
//                     <tr>
//                       <td colSpan="6">
//                         <div className={styles.stopsList}>
//                           {route.stops.map((stop, stopIndex) => (
//                             <div key={stopIndex} className={styles.stop}>
//                               <span>{stop.name}</span>
//                               <span>{stop.time}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {isAddingBus && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2 className={styles.modalTitle}>Enter Details for {selectedShift}</h2>
//             <form onSubmit={handleSubmit} className={styles.form}>
//               <div className={styles.formGroup}>
//                 <label>Bus Number</label>
//                 <input
//                   type="text"
//                   name="busNumber"
//                   value={busDetails.busNumber}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Driver Name</label>
//                 <input
//                   type="text"
//                   name="driverName"
//                   value={busDetails.driverName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Contact Number</label>
//                 <input
//                   type="text"
//                   name="contactNumber"
//                   value={busDetails.contactNumber}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Starting Point</label>
//                 <input
//                   type="text"
//                   name="startingPoint"
//                   value={busDetails.startingPoint}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Ending Point</label>
//                 <input
//                   type="text"
//                   name="endingPoint"
//                   value={busDetails.endingPoint}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Stops</label>
//                 {busDetails.stops.map((stop, index) => (
//                   <div key={index} className={styles.stopInput}>
//                     <input
//                       type="text"
//                       value={stop.name}
//                       onChange={(e) => handleStopChange(index, 'name', e.target.value)}
//                       placeholder="Stop name"
//                       required
//                     />
//                     <input
//                       type="time"
//                       value={stop.time}
//                       onChange={(e) => handleStopChange(index, 'time', e.target.value)}
//                       required
//                     />
//                     {index > 0 && (
//                       <button type="button" onClick={() => removeStop(index)} className={styles.removeButton}>
//                         <FiX />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addStop}
//                   className={styles.addStopButton}
//                 >
//                   <FiPlus /> Add Stop
//                 </button>
//               </div>
//               <div className={styles.formActions}>
//                 <button
//                   type="button"
//                   onClick={() => setIsAddingBus(false)}
//                   className={styles.cancelButton}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={styles.submitButton}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewRoutes;



import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiX } from 'react-icons/fi';
// import styles from './ViewRoutes.module.css';

const ViewRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [isAddingBus, setIsAddingBus] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [busDetails, setBusDetails] = useState({
    busNumber: '',
    driverName: '',
    contactNumber: '',
    startingPoint: '',
    endingPoint: '',
    stops: [{ name: '', time: '' }]
  });

  const toggleAccordion = (index) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  const handleAddBus = () => {
    setIsAddingBus(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleStopChange = (index, field, value) => {
    const newStops = [...busDetails.stops];
    newStops[index][field] = value;
    setBusDetails(prev => ({ ...prev, stops: newStops }));
  };

  const addStop = () => {
    setBusDetails(prev => ({
      ...prev,
      stops: [...prev.stops, { name: '', time: '' }]
    }));
  };

  const removeStop = (index) => {
    const newStops = busDetails.stops.filter((_, i) => i !== index);
    setBusDetails(prev => ({ ...prev, stops: newStops }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoutes(prev => [...prev, busDetails]);
    setIsAddingBus(false);
    setBusDetails({
      busNumber: '',
      driverName: '',
      contactNumber: '',
      startingPoint: '',
      endingPoint: '',
      stops: [{ name: '', time: '' }]
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>View Routes</h1>
        <button onClick={handleAddBus} className={styles.addButton}>
          Add Bus
        </button>
      </div>
      
      <div className={styles.busBoard}>
        {routes.length === 0 ? (
          <p className={styles.noData}>No data available</p>
        ) : (
          <ul className={styles.accordionMenu}>
            {routes.map((route, index) => (
              <li key={index} className={openIndex === index ? styles.open : ''}>
                <div className={styles.dropdownlink} onClick={() => toggleAccordion(index)}>
                  <span>{route.busNumber}</span>
                  <span>{route.driverName}</span>
                  <span>{route.contactNumber}</span>
                  <span>{`${route.startingPoint} to ${route.endingPoint}`}</span>
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                <ul className={styles.submenuItems} style={{ display: openIndex === index ? 'block' : 'none' }}>
                  {route.stops.map((stop, stopIndex) => (
                    <li key={stopIndex}>
                      <span>{stop.name}</span>
                      <span>{stop.time}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isAddingBus && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Add Bus Details</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Bus Number</label>
                <input
                  type="text"
                  name="busNumber"
                  value={busDetails.busNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Driver Name</label>
                <input
                  type="text"
                  name="driverName"
                  value={busDetails.driverName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={busDetails.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Starting Point</label>
                <input
                  type="text"
                  name="startingPoint"
                  value={busDetails.startingPoint}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ending Point</label>
                <input
                  type="text"
                  name="endingPoint"
                  value={busDetails.endingPoint}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Stops</label>
                {busDetails.stops.map((stop, index) => (
                  <div key={index} className={styles.stopInput}>
                    <input
                      type="text"
                      value={stop.name}
                      onChange={(e) => handleStopChange(index, 'name', e.target.value)}
                      placeholder="Stop name"
                      required
                    />
                    <input
                      type="time"
                      value={stop.time}
                      onChange={(e) => handleStopChange(index, 'time', e.target.value)}
                      required
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => removeStop(index)} className={styles.removeButton}>
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStop}
                  className={styles.addStopButton}
                >
                  <FiPlus /> Add Stop
                </button>
              </div>
              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setIsAddingBus(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRoutes;
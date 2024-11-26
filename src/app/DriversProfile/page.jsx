'use client';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaUser, FaSearch, FaPlus, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from './driversprofile.module.css';

const DriversProfile = () => {
  const router = useRouter();
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', age: '', busNo: '', routeCity: '', contactNo: '' });
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const response = await new Promise(resolve => setTimeout(() => resolve([
          { id: 1, name: 'John Doe', age: 35, busNo: '101', routeCity: 'Indore', contactNo: '97555xxxxx'},
          { id: 2, name: 'Jane Smith', age: 42, busNo: '202', routeCity: 'Ujjain', contactNo: '97555xxxxx' },
          { id: 3, name: 'Mike Johnson', age: 38, busNo: '303', routeCity: 'Dewas', contactNo: '97555xxxxx' },
        ]), 1500));
        setDrivers(response.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleBackClick = () => {
    router.push('/Navgo');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.routeCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDriver = () => {
    setShowAddForm(true);
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setShowEditForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedDrivers = [...drivers, { ...newDriver, id: Date.now() }].sort((a, b) => a.name.localeCompare(b.name));
    setDrivers(updatedDrivers);
    setShowAddForm(false);
    setNewDriver({ name: '', age: '', busNo: '', routeCity: '', contactNo: '' });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedDrivers = drivers.map(driver => 
      driver.id === editingDriver.id ? editingDriver : driver
    ).sort((a, b) => a.name.localeCompare(b.name));
    setDrivers(updatedDrivers);
    setShowEditForm(false);
    setEditingDriver(null);
  };

  const handleDeleteDriver = () => {
    const updatedDrivers = drivers.filter(driver => driver.id !== editingDriver.id);
    setDrivers(updatedDrivers);
    setShowEditForm(false);
    setEditingDriver(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDriver({ ...newDriver, [name]: value });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditingDriver({ ...editingDriver, [name]: value });
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading drivers Information...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.subHeader}>
        <button onClick={handleBackClick} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <h1 className={styles.title}>Drivers Profile</h1>
      </div>
      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or route city"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        <button onClick={handleAddDriver} className={styles.addButton}>
          <FaPlus /> Add Driver
        </button>
      </div>
      {filteredDrivers.length === 0 ? (
        <p className={styles.noDrivers}>No driver information available</p>
      ) : (
        <div className={styles.driversGrid}>
          {filteredDrivers.map((driver) => (
            <div key={driver.id} className={styles.driverCard}>
              <div className={styles.avatar}>
                <FaUser />
              </div>
              <div className={styles.driverInfo}>
                <InfoItem label="Name" value={driver.name} />
                <InfoItem label="Age" value={driver.age} />
                <InfoItem label="Bus No." value={driver.busNo} />
                <InfoItem label="Route" value={driver.routeCity} />
                <InfoItem label="contact" value={driver.contactNo} />
              </div>
              <button className={styles.editButton} onClick={() => handleEditDriver(driver)}><FaEdit /></button>
            </div>
          ))}
        </div>
      )}
      {showAddForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add New Driver</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={newDriver.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              <input
                type="number"
                name="age"
                value={newDriver.age}
                onChange={handleInputChange}
                placeholder="Age"
                required
              />
              <input
                type="text"
                name="busNo"
                value={newDriver.busNo}
                onChange={handleInputChange}
                placeholder="Bus No."
                required
              />
              <input
                type="text"
                name="routeCity"
                value={newDriver.routeCity}
                onChange={handleInputChange}
                placeholder="Route City"
                required
              />
              <input
                type="number"
                name="contactNo"
                value={newDriver.contactNo}
                onChange={handleInputChange}
                placeholder="Contact No."
                required
              />
              <button type="submit">Add Driver</button>
              <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {showEditForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Details</h2>
            <form onSubmit={handleEditFormSubmit}>
              <input
                type="text"
                name="name"
                value={editingDriver.name}
                onChange={handleEditInputChange}
                placeholder="Name"
                required
              />
              <input
                type="number"
                name="age"
                value={editingDriver.age}
                onChange={handleEditInputChange}
                placeholder="Age"
                required
              />
              <input
                type="text"
                name="busNo"
                value={editingDriver.busNo}
                onChange={handleEditInputChange}
                placeholder="Bus No."
                required
              />
              <input
                type="text"
                name="routeCity"
                value={editingDriver.routeCity}
                onChange={handleEditInputChange}
                placeholder="Route City"
                required
              />
              <input
                type="number"
                name="contactNo"
                value={editingDriver.contactNo}
                onChange={handleEditInputChange}
                placeholder="Contact No."
                required
              />
              <button type="submit">Save Info</button>
              <button type="button" onClick={handleDeleteDriver}>Delete Driver Profile</button>
              <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <span className={styles.label}>{label} : </span>
    <span className={styles.value}>{value}</span>
  </div>
);

export default DriversProfile;
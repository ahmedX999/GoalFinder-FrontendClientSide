import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';


const ExampleComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [reservations, setReservations] = useState({
    reservationDate: "",
    reservationTime: "",
    numberOfPlayers: 0
  });

  const [fields, setFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const fieldsPerPage = 3;

  useEffect(() => {
    fetchFields();
    fetchReservations();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get('http://localhost:8080/fields/all');
      setFields(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reservations/all');
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const AddReservation = async () => {
    try {
      const response = await axios.post('http://localhost:8080/reservations/save', reservations);
      setReservations({
        reservationDate: "",
        reservationTime: "",
        numberOfPlayers: 0
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReservationDateChange = (event) => {
    setReservations({
      ...reservations,
      reservationDate: event.target.value
    });
  };

  const handleReservationTimeChange = (event) => {
    setReservations({
      ...reservations,
      reservationTime: event.target.value
    });
  };

  const handleNumberOfPlayersChange = (event) => {
    setReservations({
      ...reservations,
      numberOfPlayers: event.target.value
    });
  };

  const handleReservationTotalChange = (event) => {
    setReservations({
      ...reservations,
      totalPrice: event.target.value
    });
  }

  const filteredFields = fields.filter((field) =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastFields = currentPage * fieldsPerPage;
  const indexOfFirstFields = indexOfLastFields - fieldsPerPage;
  const currentFields = filteredFields.slice(indexOfFirstFields, indexOfLastFields);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const CloseModal = () => {
    setIsOpen(false);
  };

  const OpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
       <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-4 text-left px-6">
        <div class="modal-header flex justify-between items-center pb-3">
          <h5 class="text-2xl font-bold">Réserver votre place</h5>
     
        </div>
        <form onSubmit={AddReservation}>
          <div class="modal-body">
            <div class="mb-3">
              <label class="block text-gray-700 font-bold mb-2">Date de réservation</label>
              <input type="date" class="form-control border w-full p-2" value={reservations.reservationDate} onChange={handleReservationDateChange} required />
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 font-bold mb-2">Heure de réservation</label>
              <input type="time" class="form-control border w-full p-2" value={reservations.reservationTime} onChange={handleReservationTimeChange} required />
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 font-bold mb-2">Nombre de joueurs</label>
              <input type="number" class="form-control border w-full p-2" value={reservations.numberOfPlayers} onChange={handleNumberOfPlayersChange} required />
            </div>
            <div class="mb-3">
              <label class="block text-gray-700 font-bold mb-2">Total Price</label>
              <input type="text" class="form-control border w-full p-2" value={reservations.totalPrice} onChange={handleReservationTotalChange} required />
            </div>
          </div>
          <div class="modal-footer flex justify-end pt-4">
            <button type="submit" class="btn btn-primary mr-2">Réserver</button>
           
          </div>
        </form>
      </div>
    </div>
  </div>
      </Modal>
    </div>
  );
};

export default ExampleComponent;

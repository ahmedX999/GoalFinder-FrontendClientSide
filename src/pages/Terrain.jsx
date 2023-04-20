import Head from 'next/head';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Header } from '@/components/Header'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
//import Modal from '@mui/material/Modal';
import axios from 'axios';
import { FiX } from 'react-icons/fi';

import Modal  from 'react-modal';
//import 'bootstrap/dist/css/bootstrap.min.css'



export default function Terrain() {
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
    <>
      <Head>
        <title>fields Details</title>
      </Head>
      <Header />
  
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Search fields"
            variant="outlined"
            margin="normal"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: "20px" }}>
        
            {currentFields.map(fields => (
             
              <Card key={fields.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt={fields.name}
                  height="140"
                  image={fields.photo}
                />


 <Modal isOpen={isOpen} onRequestClose={CloseModal} iaHideApp={false} >
  <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-4 text-left px-6">
        <div class="modal-header flex justify-between items-center pb-3">
          <h5 class="text-2xl font-bold">Réserver votre place</h5>
          <button type="button" class="btn-close" onClick={CloseModal}></button>
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
            <button type="reset" class="btn btn-secondary" onClick={CloseModal}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</Modal>



                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {fields.name}
                  </Typography>
                  <Typography  variant="body1" color="text.secondary">
                   Field Sportif
                  </Typography>
                  <hr />
                  <span className="inline-block">
              4.5
            </span>
            <span class="inline-block">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-amber" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M9.073 1.62a1.5 1.5 0 012.854 0l1.136 3.682a1.5 1.5 0 001.423 1.018l3.773.275a1.5 1.5 0 01.832 2.565l-2.944 2.18a1.5 1.5 0 00-.597 1.417l1.098 3.74a1.5 1.5 0 01-2.296 1.59l-3.416-2.506a1.5 1.5 0 00-1.87 0l-3.416 2.506a1.5 1.5 0 01-2.296-1.59l1.098-3.74a1.5 1.5 0 00-.597-1.417l-2.944-2.18a1.5 1.5 0 01.832-2.565l3.773-.275a1.5 1.5 0 001.423-1.018l1.136-3.682z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
                  <br />
                  <br></br>
                  <Typography variant="body2" color="text.secondary">
                  <span className="px-2 py-1 border rounded-full cursor-pointer hover:bg-primary-light">
                  nombre de joueurs en lobby
                </span>{fields.capacity}<br></br><br></br>
                <span className="px-2 py-1 border rounded-full cursor-pointer hover:bg-primary-light">
                  Price
                </span>{fields.price_perslot} DH
                  </Typography>
                  <h3 className="text-sm font-medium mt-2 mb-1">Availability</h3>
                  <span className="px-2 py-1 border rounded-full cursor-pointer hover:bg-primary-light">
                  5:30PM
                </span>
                <span className="px-2 py-1 border rounded-full cursor-pointer hover:bg-primary-light">
                  7:30PM
                </span>
                <span className="px-2 py-1 border rounded-full cursor-pointer hover:bg-primary-light">
                  9:00PM
                </span>


                </CardContent>
                <CardActions>
                  <Button size="small"
            style={{ backgroundColor: "#E0B0FF", color: "white" }}  onClick={() => OpenModal()} >Reserve</Button>
                 
                </CardActions>
              </Card>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
            <Pagination count={Math.ceil(filteredFields.length / fieldsPerPage)} page={currentPage} onChange={handlePageChange} />
          </Box>
        </Box>
      </Container>
    </>
  )
}

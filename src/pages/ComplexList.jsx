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



export default function Login() {




  const [complexes, setComplexes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const complexesPerPage = 3;

  useEffect(() => {
    fetch('http://localhost:8080/complexes/all')
      .then(response => response.json())
      .then(data => {
        setComplexes(data);
      });
  }, []);

  const filteredComplexes = complexes.filter(complex =>
    complex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastComplex = currentPage * complexesPerPage;
  const indexOfFirstComplex = indexOfLastComplex - complexesPerPage;
  const currentComplexes = filteredComplexes.slice(indexOfFirstComplex, indexOfLastComplex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

 

  return (
    <>
      <Head>
        <title>Complex Details</title>
      </Head>
      <Header />
  
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Search Complexes"
            variant="outlined"
            margin="normal"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: "20px" }}>
        
            {currentComplexes.map(complex => (
             
              <Card key={complex.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt={complex.name}
                  height="140"
                  image={complex.photo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {complex.name}
                  </Typography>
                  <Typography  variant="body1" color="text.secondary">
                   Complex Sportif
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
                  <Typography variant="body2" color="text.secondary">
                    {complex.description}
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
            style={{ backgroundColor: "#E0B0FF", color: "white" }}>Reserve</Button>
                 
                </CardActions>
              </Card>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
            <Pagination count={Math.ceil(filteredComplexes.length / complexesPerPage)} page={currentPage} onChange={handlePageChange} />
          </Box>
        </Box>
      </Container>
    </>
  )
}

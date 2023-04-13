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



export default function Terrain() {




  const [fields, setfields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const fieldsPerPage = 3;

  useEffect(() => {
    fetch('http://localhost:8080/fields/all')
      .then(response => response.json())
      .then(data => {
        setfields(data);
      });
  }, []);

  const filteredfields = fields.filter(fields =>
    fields.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastfields = currentPage * fieldsPerPage;
  const indexOfFirstfields = indexOfLastfields - fieldsPerPage;
  const currentfields = filteredfields.slice(indexOfFirstfields, indexOfLastfields);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
        
            {currentfields.map(fields => (
             
              <Card key={fields.id} sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt={fields.name}
                  height="140"
                  image={fields.photo}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {fields.name}
                  </Typography>
                  <Typography  variant="body1" color="text.secondary">
                   fields Sportif
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
                  capacity
                </span>{fields.capacity}<br></br><br></br>
                <span className="px-2 py-1 border rounded-full cursor-pointer hover:bg-primary-light">
                  Price
                </span>{fields.price_perslot}
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
            <Pagination count={Math.ceil(filteredfields.length / fieldsPerPage)} page={currentPage} onChange={handlePageChange} />
          </Box>
        </Box>
      </Container>
    </>
  )
}

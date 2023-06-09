import dynamic from 'next/dynamic';


import { useState, useEffect } from 'react';
import L from 'leaflet';



import('leaflet/dist/leaflet.css')
  .then(() => {
    // Leaflet CSS has been loaded
  })
  .catch((error) => {
    console.error('Failed to load Leaflet CSS:', error);
  });

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false, // disable server-side rendering
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
    ssr: false,
  });
  
  const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
    ssr: false,
  });

  const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
    ssr: false,
  });



  
  

 




 


function Map() {


  

   

    
  
    const [complexes, setComplexes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const complexesPerPage = 100;
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          
        });
      },
      error => {
        console.log(error);
      }
    );
  }, []);

 

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




 
  const position1 = [31.627554742023015, -8.047915830682868]; // Define the initial position of the map 31.627554742023015, -8.047915830682868

  // Check if we're running in the browser before using Leaflet
  if (typeof window !== 'undefined') {
    const L = require('leaflet');
  }
 



  return (
    <>
   
        <><div style={{ height: '500px', width: '100%' }}>
                <MapContainer center={position1} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors" />
                        { currentPosition && currentComplexes.map(complex => (
                    <><Marker
                    icon={L.icon({
                      iconUrl: 'https://cdn-icons-png.flaticon.com/512/919/919431.png', // Replace with the actual URL of the icon
                      iconSize: [32, 32], // Adjust the size of the icon as per your requirements
                    })}
                    key={complex.id} position={[complex.laltitude, complex.longitude]}>
                            <Popup>{complex.name}</Popup>
                          </Marker>
                          <Marker
                          icon={L.icon({
                            iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535239.png', // Replace with the actual URL of the icon
                            iconSize: [32, 32], // Adjust the size of the icon as per your requirements
                          })}
                          position={[currentPosition.lat, currentPosition.lng]}>
                              <Popup>My Current position</Popup>
                            </Marker></>
                  
                    ))}
                </MapContainer>
            </div></>

     



    

        
    </>
  );
}

export default Map;

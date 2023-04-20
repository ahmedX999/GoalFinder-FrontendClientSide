import { Header } from '@/components/Header'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

export default function ReservationList() {
    const [reservations, setReservations] = useState([]);
  
     useEffect(() => { getReservations(); }, []); 
     const getReservations = async () => { 
             try { const response = await axios.get('http://localhost:8080/reservations/all'); 
             setReservations(response.data); 
            }
             catch (error) { console.error(error);}};


  
  return (
    <>
      <Head>
        <title>Reservation List</title>
      </Head>
      <Header/>
      <div className='container mx-auto my-8'>
      <div className='h-12'>
        <h1>List Reservations :</h1>
      </div>
      <div className='flex shadow border-b'>
        <table className='min-w-full'>
            <thead className='bg-blue-50'>
                <tr>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        id
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Number of players
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Date Reservation
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Time Reservation
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Total Price
                    </th>
                    
                </tr>

            </thead>

            <tbody className='bg-white'> 
            {reservations.map((reservation) => (
                
                <tr key={reservation.id}>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900' >{reservation.id}</div>
                    </td>
                    
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900' >{reservation.numberOfPlayers}</div>
                    </td>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{reservation.reservationDate}</div>
                    </td>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{reservation.reservationTime}</div>
                    </td>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{reservation.totalPrice}</div>
                    </td>
                    
                </tr>
                ))} 

            </tbody>
        </table>
      </div>
      </div>


      
    </>
  )
}

import { Header } from '@/components/Header'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function PaymentList() {
    const [reservations, setReservations] = useState([]);
  
     useEffect(() => { getReservations(); }, []); 
     const getReservations = async () => { 
             try { const response = await axios.get('http://localhost:8080/payments/all'); 
             setReservations(response.data); 
            }
             catch (error) { console.error(error);}};

             const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Payment List</title>
      </Head>
      <Header/>
      <div className='container mx-auto my-8'>
      <div className='h-12'>
        <h1>Payment List :</h1>
       
      </div>
      <hr />
      <div className='flex shadow border-b'>
        <table className='min-w-full'>
            <thead className='bg-blue-50'>
                <tr>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        id
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Total Amount
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Payment Method
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Amount Payed
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        User Lastname
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        Field Name
                    </th>
                    <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                        State
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
                        <div className='text-sm text-gray-900' >{reservation.amount}</div>
                    </td>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{reservation.paymentMethod}</div>
                    </td>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{reservation.etat}</div>
                    </td>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{reservation.user.lastname}</div>
                    </td>

                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{reservation.field.name}</div>
                    </td>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'><img height={10} width={10} src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg" alt="" /></div>
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

import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


export default function Fields() {
    const router = useRouter();
    const { id } = router.query;
    const [fields, setFields] = useState([]);
  
    useEffect(() => {
      async function fetchFields() {
        try {
          const res = await fetch(`http://localhost:8080/complexes/1/fields`);
          const data = await res.json();
          setFields(data._embedded.fields);
        } catch (error) {
          console.error(error);
        }
      }
      fetchFields();
    }, []);


  return (
    <>
      <Head>
        <title>Fields for Complex {id} - Pocket</title>
      </Head>
      <h1>Fields for Complex {id}</h1>
      {fields.map(field => (
        <div key={field._links.self.href}>
          <h2>{field.name}</h2>
          <p>Capacity: {field.name}</p>
          {field.photo && <img src={field.photo} alt={field.name} />}
        </div>
      ))}
    </>
  )
}

import { Header } from '@/components/Header'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";



export default function App() {
    const router = useRouter();
  const { reservationId,totalPrice } = router.query;

  
 
  return (
    <>
    <Head>
        <title>Payment</title>
      </Head>
      <Header/>
      
    <MDBContainer fluid className="p-5" style={{ backgroundColor: "#eee" }}>
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center pb-5">
            <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
              <div className="py-4 d-flex flex-row">
              <h2>Payment</h2>
              
      
             
               
              </div>
              <p className="text-success">Enter your payment details for reservation id {reservationId} :</p>  
         
              <div className="pt-2">
                <div className="d-flex pb-2">
                  
                  <div className="ms-auto">
                    <p className="text-primary">
                    <a href="/AddCard" className="text-primary">
                      Add payment card
                      </a>
                    </p>
                  </div>
                </div>
               
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                  <img
                  className="img-fluid"
                  src="https://img.icons8.com/color/48/000000/visa.png"
                />
                    <p className="mb-0">
                    {" "}
                      Visa Debit Card
                    </p>
                    <div className="ms-auto">************3456</div>
                  </div>
                </div>
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                  <img
                  className="img-fluid"
                  src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                />
                    <p className="mb-0">
                      {" "}
                      Mastercard Office
                    </p>
                    <div className="ms-auto">************1038</div>
                  </div>
                </div>
                <MDBBtn block size="lg">
                  Proceed to payment
                </MDBBtn>
              </div>
            </MDBCol>
            <MDBCol md="5" xl="4" offsetXl="1">
              {" "}
              <div className="py-4 d-flex justify-content-end">
                <h6>
                  <a href="/">Cancel and return to website</a>
                </h6>
              </div>
              <div
                className="rounded d-flex flex-column p-2"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="p-2 me-3">
                  <h4>Order Recap</h4>
                </div>
               
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">Insurance Responsibility</MDBCol>
                  <div className="ms-auto">
                    <b>10.00 MAD</b>
                  </div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">
                    Patient Balance{" "}
                    <span className="fa fa-question-circle text-dark"></span>
                  </MDBCol>
                  <div className="ms-auto">
                    <b>10.00 MAD</b>
                  </div>
                </div>
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">
                    <b>Total</b>
                  </MDBCol>
                  <div className="ms-auto">
                
                    <b className="text-success">{totalPrice}.00  MAD</b>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  );
}
import React from "react"
import './home.css';

const Home = () => {
    return(
        <div>
            {/* <h1 style={{color: "blue", backgroundColor: "white", textAlign: "center" }}>Hey</h1> */}
            {/* <p></p> */}
            <h2 className="welcome" style={{backgroundColor: "#131720", whiteSpace: "nowrap"}}>About our Hospital Admin Website:</h2>
            <ul className="parag">
                <li>Our innovative website is designed to provide a comprehensive solution for managing the database of a hospital efficiently.</li>
                <br/>
                <li>With our user-friendly interface and powerful database management system, you can effortlessly perform CRUD (Create, Read, Update, Delete) operations on various tables within the database.</li>
                <br/>
                <li>Our platform's intuitive interface and robust functionality empower hospital administrators and staff to streamline their operations effectively.</li>
                <br/>
                <li>With the ability to perform CRUD operations on the Supplier, Doctor, Patient, Operation, Prosthetic, and Supplied By tables, you can maintain accurate and up-to-date information about various entities within the hospital ecosystem.</li>
                <br/>
                <li>Whether you need to add new records, retrieve specific information, update existing data, or remove outdated entries, our Hospital Admin Platform simplifies these tasks and ensures smooth database management.</li>
                <br/>
                <li>With our solution, you can enhance operational efficiency, improve coordination among stakeholders, and deliver exceptional patient care.</li>
                <br/>
                <li>Experience the power of our Hospital Admin Platform today and witness the transformative impact it can have on your hospital's operations. Streamline your administrative processes, enhance data management, and focus on what truly matters – providing top-notch healthcare services to your patients.</li>
            </ul>
        </div>
    )
}

export default Home
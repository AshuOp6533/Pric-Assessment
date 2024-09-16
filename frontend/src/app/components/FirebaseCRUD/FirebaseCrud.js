"use client"
import FirebaseConfig from "../FirebaseConfig/FirebaseConfig";
import { ref, set, get, update, remove } from "firebase/database";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const database = FirebaseConfig();

function FirebaseCrud() {
    let [id, setId] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [age, setAge] = useState('');
    let [contact, setContact] = useState('');
    let [persons, setPersons] = useState([]);

    let isNullOrWhiteSpaces = value => {
        value = value.toString();
        return (value == null || value.trim().length < 1);
    };

    let InsertData = () => {
        if (isNullOrWhiteSpaces(firstName) || isNullOrWhiteSpaces(lastName) || isNullOrWhiteSpaces(age) || isNullOrWhiteSpaces(contact)) {
            alert("Fill all the fields");
            return; 
        }

        const personRef = ref(database, 'Person/' + id);
        get(personRef).then(snapshot => {
            if (snapshot.exists()) {
                alert("Person already exists");
            } else {
                set(personRef, {
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    contact: contact
                }).then(() => {
                    alert("Data added successfully");
                    // Clear fields after successful insertion
                    setId('');
                    setFirstName('');
                    setLastName('');
                    setAge('');
                    setContact('');
                }).catch(error => {
                    console.log(error);
                    alert("Failed to add data");
                });
            }
        }).catch(error => {
            console.log(error);
            alert("Data retrieval was unsuccessful");
        });
    };

    let UpdateData = () => {
        if (isNullOrWhiteSpaces(id)) {
            alert("ID is required");
            return; 
        }

        const personRef = ref(database, 'Person/' + id);
        get(personRef).then(snapshot => {
            if (snapshot.exists()) {
                update(personRef, {
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    contact: contact
                }).then(() => {
                    alert("Data updated successfully");
                }).catch(error => {
                    console.log(error);
                    alert("Failed to update data");
                });
            } else {
                alert("Person does not exist");
            }
        }).catch(error => {
            console.log(error);
            alert("Data retrieval was unsuccessful");
        });
    };

    let DeleteData = () => {
        if (isNullOrWhiteSpaces(id)) {
            alert("ID is required");
            return;
        }

        const personRef = ref(database, 'Person/' + id);
        get(personRef).then(snapshot => {
            if (snapshot.exists()) {
                remove(personRef).then(() => {
                    alert("Data deleted successfully");
                    // Clear fields after successful deletion
                    setId('');
                    setFirstName('');
                    setLastName('');
                    setAge('');
                    setContact('');
                }).catch(error => {
                    console.log(error);
                    alert("Failed to delete data");
                });
            } else {
                alert("Person does not exist");
            }
        }).catch(error => {
            console.log(error);
            alert("Data retrieval was unsuccessful");
        });
    };

    let FetchAllPersons = () => {
        const personsRef = ref(database, 'Person/');
        get(personsRef).then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert data object to array for easier display
                const personArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setPersons(personArray);
            } else {
                alert("No data available");
            }
        }).catch(error => {
            console.log(error);
            alert("Data retrieval was unsuccessful");
        });
    };

    useEffect(() => {
        // Optionally, you can fetch the data when the component mounts
        FetchAllPersons();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Firebase CRUD Operations</h2>
            <div className="form-group mb-3">
                <label htmlFor="id">ID</label>
                <input type="text" className="form-control" id="id" value={id} onChange={e => setId(e.target.value)} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="age">Age</label>
                <input type="number" className="form-control" id="age" value={age} onChange={e => setAge(e.target.value)} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="contact">Contact</label>
                <input type="text" className="form-control" id="contact" value={contact} onChange={e => setContact(e.target.value)} />
            </div>
            <button className="btn btn-primary me-2" onClick={InsertData}>Add Data</button>
            <button className="btn btn-warning me-2" onClick={UpdateData}>Update Data</button>
            <button className="btn btn-danger me-2" onClick={DeleteData}>Delete Data</button>
            <button className="btn btn-info" onClick={FetchAllPersons}>Fetch All Data</button>
            <br />
            <h2 className="mt-4">All Persons</h2>
            <ul className="list-group">
                {persons.map(person => (
                    <li className="list-group-item" key={person.id}>
                        <strong>ID:</strong> {person.id} <br />
                        <strong>First Name:</strong> {person.firstName} <br />
                        <strong>Last Name:</strong> {person.lastName} <br />
                        <strong>Age:</strong> {person.age} <br />
                        <strong>Contact:</strong> {person.contact} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FirebaseCrud;

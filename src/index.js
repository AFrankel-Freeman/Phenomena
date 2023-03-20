import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';



const App = () => {
    title, 
    location, 
    description, 
    password


    const [reports, setReports] = useState([]);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        const getReports = async () => {
            try{
                const response = await axios.get('/api/reports');
                setReports(response.data.reports);
            } catch (err){
                console.log(err);
            }
        }
        getReports();
    }, []);

    const onChange = ( event) => {
            if(event.target.name === 'title' ) {
                setTitle(event.target.value);
            } else if(event.target.name === 'location') {
                setLocation(event.target.value)
            } else if (event.target.name === 'description') {
                setDescription(event.target.value)
            } else if (event.target.name === 'password') {
                setPassword (event.target.value)
            }
    }
    const createReport = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/reports', {
                title, 
                location, 
                description, 
                password
            });
            console.log(response.data)
            setReports([...reports, response.data ])

        } catch(err) {
            console.log(err);
        }
    }

return(
     <>
        <h1>Phenomena</h1>

         <ul>
             {
                 reports.map((report, i) => {
                     return <li key={i}> {report.title}</li>
                 })
             }
         </ul>

         <form onSubmit= {createReport}> 
             <input value={ title } onChange = { onChange } name = 'title' placeholder = 'title' />
             <input value={ location } onChange = { onChange} name = "location" placeholder = 'location' />
             <input value = { description } onChange = { onChange} name = "description" placeholder = "description" />
             <input value = { password } onChange = { onChange} name = "password" placeholder = "password" />
             <button>Create Report</button>
        </form>
     </>
)
}


const root = createRoot(document.getElementById('root'));
root.render(<App />);
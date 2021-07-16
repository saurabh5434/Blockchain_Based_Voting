import React from 'react';
import Table from 'react-bootstrap/Table';
import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Main = ({vote, candidates})=> {
  
  const [id, setId] = useState("-1");
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  
  const handleSubmit = (evt) => {
      evt.preventDefault();    
      alert(`Submitting id ${id}`)
      if(id==="-1"){
        alert("Please select candidate");
        return;
      }
      vote(id);
   }

  return (
    <main role="main" style = {{marginTop:"80px"}} className="col-lg-12 d-flex">
      <div className="container">
        <h2>Election : Cast your vote here</h2>  
        <h5>Candidate list</h5>
        <hr/>
        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
            {candidates.map((candidate, key)=>{
              return(
              <tr key={key}>
                <td>{candidate.index.toString()}</td>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount.toString()}</td>
              </tr>
                )
            })}
            </tbody>
      </Table>
      <Form onSubmit={handleSubmit}>
         <Form.Label>Select your candidate</Form.Label>
          <Form.Control as="select" size="sm" custom onChange={event=>setId(event.target.value)} value={id}>
              <option value="-1">Select</option>
              
              {candidates.map((candidate, key)=>{
              return(
              <option key={key} value={candidate.index}>{candidate.name}</option>
                )
              })}

           </Form.Control>
           <br/>
         <Button variant="outline-success" type="submit">Submit Vote</Button>
      </Form>
    </div>
    </main>

    )
};
export default Main;

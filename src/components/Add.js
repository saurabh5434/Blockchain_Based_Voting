import React from 'react';
import Table from 'react-bootstrap/Table';
import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Main = ({addCandidate, candidates, deleteCandidate})=> {
  
  const [name, setName] = useState("");
  const [id, setId] = useState(-1);

   const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting name ${name}`)
      addCandidate(name);
      setName("");
  }

  const handleDelete = (evt)=>{
    evt.preventDefault();
    alert(id);
    deleteCandidate(id);
    setId(-1);

  }
  return (
      <div className="container" style={{marginTop:"80px"}}>
        
        <h2>Election</h2>  
        <h5>Candidate list</h5>
        <hr/>
        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Vote Count</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>

             
              {candidates.map((candidate, key)=>{
              return(
                <tr key={key}>
                <td>{candidate.index.toString()}</td>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount.toString()}</td>
                <td>
                    <Form onSubmit={handleDelete}>
                      <Button variant="outline-danger" value={candidate.index} type="submit" onClick={event=>setId(event.target.value)}>
                          Delete
                      </Button>
                    </Form>
                </td>
              </tr>
                )
            })}
            </tbody>
      </Table>
      <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Enter candidate name</Form.Label>
            <Form.Control type="text" placeholder="name" onChange={event=>setName(event.target.value)} value={name} />
          </Form.Group>
          <Button variant="outline-success" type="submit">Add</Button>
      </Form>
    </div>
    )
};
export default Main;

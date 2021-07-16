import React from 'react';
import Table from 'react-bootstrap/Table';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';

const Main = ({candidates, winner})=> {
  
  const [display, setDisplay] = useState(false);
  const handleClick = () => {
      winner();
  }

  const handleSee = () => {
      setDisplay(true);
   }


  return (
    <main role="main" style = {{marginTop:"80px"}} className="col-lg-12 d-flex">
      <div className="container">
        <Button variant="outline-success" onClick={handleClick}>Prepare result</Button>
        <Button style={{marginLeft:"20px"}} variant="outline-success" onClick={handleSee}>See result</Button>
        <br/>
        <br/>
        <div style={{display: display ? "inline" : "none" }} >
              <h2>Election Result</h2>  
              <h5>Candidate list</h5>
              <hr/>
              <Table striped bordered hover size="sm" >
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
                        <tr key={key} style={{color:"white"}}>
                            {candidate.isWinner ? 
                                <>                         
                                <td style={{backgroundColor:"green"}}>{candidate.index.toString()}</td>
                                <td style={{backgroundColor:"green"}}>{candidate.name}</td>
                                <td style={{backgroundColor:"green"}}>{candidate.voteCount.toString()}</td>
                                </>
                              :
                                <>                         
                                <td style={{backgroundColor:"red"}}>{candidate.index.toString()}</td>
                                <td style={{backgroundColor:"red"}}>{candidate.name}</td>
                                <td style={{backgroundColor:"red"}}>{candidate.voteCount.toString()}</td>
                                </> 
                              
                            }
                        </tr>
                        )
                    })}
                  </tbody>
            </Table>
        </div>
    </div>
    </main>
    )
};
export default Main;

import React, { useEffect, useState, useCallback } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Web3 from 'web3';
import './App.css';
import Election from '../abis/Election.json';
import Navbar from './Navbar.js';
import Main from './Main.js';
import Add from './Add.js';
import Home from './Home.js'
import Result from './Result';
import Loading from './Loading';

const App = ()=> {
  
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);  
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin]=  useState(null);
  const [candidatesCount, setCandidatesCount] = useState(0);

  const loadWeb3 = async() => {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log(window.web3);
      console.log("window.web3 loaded successfully");
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.cuurentProvider);
    }
    else{
      window.alert("Install Metamask");
    }
  };

  const loadBlockchainData = async() => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Election.networks[networkId];
    if(networkData)
    {
        const abi = Election.abi;
        const contract = web3.eth.Contract(abi, networkData.address);
        const accounts = await web3.eth.getAccounts();
        const count = await contract.methods.count().call();
        const admin = await contract.methods.owner().call();
        const candidates = await contract.methods.getCandidates().call();

        console.log(admin);
        setLoading(false);
        setContract(contract);
        setCandidatesCount(count);
        setAccount(accounts[0]);
        setAdmin(admin);
        setCandidates(candidates);
    }
    else
    {
      window.alert("Contract not deployed to detected network");
      return;
    }
  };
  
  const loadBlockchainDataAfterUpdate = async()=>{
    if(contract){
      const candidates = await contract.methods.getCandidates().call();
      setCandidates(candidates);
    }
      setLoading(false);
  };

  const vote = useCallback(
    (id)=>{
      setLoading(true)
      contract.methods.vote(id).send({ from : account})
      .once('receipt', (receipt)=>{
        setLoading(false);
        console.log(receipt);
      });

  }
  );

  const addCandidate = useCallback(
    (name) =>{
      setLoading(true)
      contract.methods.addCandidate(name).send({ from : account})
      .once('receipt', (receipt)=>{
        setLoading(false);
        console.log(receipt.data);
      });
    }
  );

  const deleteCandidate = useCallback(
    (id) =>{
      setLoading(true)
      contract.methods.deleteCandidate(id).send({ from : account})
      .once('receipt', (receipt)=>{
        console.log(receipt.data);
      });
      setLoading(false);
    }
  );

  const winner = useCallback(
    ()=>{
      setLoading(true);
      contract.methods.getWinner().send({from:account}).once("receipt", (receipt)=>{
        console.log(receipt);
      });
      setLoading(false);
    }
  );

  useEffect(()=>{
    loadWeb3();
    loadBlockchainData();
  },[]);

  useEffect(()=>{
    loadBlockchainDataAfterUpdate();
  }, [vote, addCandidate, deleteCandidate, winner]);


  window.ethereum.on('accountsChanged', function (accounts) {
    setAccount(accounts[0]);
  })

  window.ethereum.on('chainChanged', chainId => {
  // handle the new network
  console.log("chainId changed");
  })
  // console.log(Admin);

  return (
      <div>
        <Navbar account={account}  admin = {admin}/>
        {loading ? 
          <Loading />
        :
           <Switch>
              <Route key="home" exact path="/"  render={()=> <Home/>}/>
              <Route key="vote" exact path="/vote"  render={()=> <Main vote={vote} candidates={candidates}/>}/>
              <Route key="manageCandidates" exact path="/manage"  render={()=>
                <Add addCandidate={addCandidate} candidates={candidates} deleteCandidate={deleteCandidate}/>}/>
              <Route key="result" exact path="/result"  render={()=> <Result candidates={candidates} winner={winner}/>}/>
            </Switch>
        }
        
      </div>
    )
};


export default App;

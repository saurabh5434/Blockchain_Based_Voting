# Blockchain_Based_Voting

Blockchain based voting system is a secure, decentrilized way of voting. It enables voter to vote from any place and prevent vote tampering.

## Technologies

* Node js
* React js (frontend)
* Truffle
* Ganache
* Metamask

## Workflow
The admin will initiate the election by adding candidates.Once the candidate list is prepared, the voter will be able to cast the vote to candidate. After voter makes request to cast 
vote, the smart contract function checks if the voter has already casted his/her vote or not.If the voter has not casted vote earlier, then smart contract allows voter to cast vote 
to requested candidate by confirming the metamask transcation notification. After confirming the metamask notification, voter's vote is recorded on blockchain.
At the end, the candidate(s) with maximum number of votes will be the winner of the election.

## Screenshots
### Candidate List
![candidate list](/public/CadiddateList.png)


### Cast vote
![cast vote](/public/castVotes.PNG)

### See result
![result](/public/result.png)

## To run
* truffle migrate --reset
* cd src
* npm run start

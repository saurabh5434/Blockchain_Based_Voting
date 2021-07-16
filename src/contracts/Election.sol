pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Election{

	address public owner;
	struct Candidate{
		uint index;
		string name;
		uint voteCount;
		bool isWinner;
	}

	mapping(address => bool) public voters;

    Candidate[] public candidate;
    
    uint public count;
	
	event Voted(
		address voter,
		uint to_candidate
	);

	event CandidateDeleted(
		uint id,
		string name
	);
	
	constructor() public{
		owner = msg.sender;
	}


	function addCandidate(string memory _name) public{
		require(msg.sender==owner, "You are not allowed to add Candidate");

		Candidate memory c;
		c.name = _name;
		c.index = count;
		candidate.push(c);
		count = candidate.length;
	}

	function deleteCandidate(uint _candidateIndex) public{
		require(msg.sender==owner, "You are not allowed to delete Candidate");
		
		string memory _name = candidate[_candidateIndex].name;
       	uint idx = candidate[_candidateIndex].index;

        Candidate memory temp = candidate[candidate.length-1];
        candidate[_candidateIndex] = temp;
       	candidate[_candidateIndex].index = idx;
        candidate.pop();
        count = candidate.length;
        
		emit CandidateDeleted(_candidateIndex, _name);

	}
	
	
	function getCandidates() public view returns(Candidate[] memory){
	    return candidate;    
	}
	
	function vote(uint _candidateIndex) public{
		require(voters[msg.sender]==false, "Already Voted");
		
		candidate[_candidateIndex].voteCount++;
		
		voters[msg.sender] = true;
		emit Voted(msg.sender, _candidateIndex);
	}
	
	function getWinner() public{
	    
	    uint max_count = 0;
	    for(uint i=0;i<candidate.length;i++){
	        if(max_count<candidate[i].voteCount)
	        {
	            max_count = candidate[i].voteCount;
	        }
	    }
	    
	    for(uint i=0;i<candidate.length;i++)
	    {
	        if(max_count==candidate[i].voteCount){
	            candidate[i].isWinner = true;
	        }
	    }
	}
}
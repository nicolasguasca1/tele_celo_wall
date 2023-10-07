//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	// State Variables
	uint256 numVecinos = 5;
	address public immutable owner;
	uint256 public totalCounter = 0;
	mapping(address => uint) public userGreetingCounter;
	mapping(address => mapping (string => string)) votes;
	mapping(string => uint256) votesPositive;
	mapping(address => uint256) userMoney;

	// cantidad dinero comunidad
	uint256 public totalMoney;
	//mapping derramas
	mapping(string => mapping(address => uint256)) public derramas;
	mapping(address => mapping(string => uint256)) public pagoDerramas;

	event PagoDerramas(
		address indexed userFlat,
		string indexed derrama,
		uint256 value
	);

	event VotosPropuestas(
		string indexed idDerrama,
		address indexed userFlat,
		string value
	);

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner) {
		owner = _owner;
		totalMoney = 0;
	}


	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */
	function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}


	/**
	 * Function that save a vote
	 */

	function saveVote(string memory _vote, string memory _idVote) public {
		votes[msg.sender][_idVote] = _vote;
		console.log(
			"Se ha votado '%s'",
			_vote
		);
		if(keccak256(abi.encodePacked("OK")) == keccak256(abi.encodePacked(_vote))) {
			votesPositive[_idVote] = votesPositive[_idVote]++;
		}
		emit VotosPropuestas(_idVote, msg.sender, _vote);
	}

	 /**
	  * Function that get a vote
	  */
	function getVote(address _msgAddress, string memory _idVote) public view returns (string memory) {
		return votes[_msgAddress][_idVote];
	}

	function newVote(string memory _idVote) public {
		votesPositive[_idVote] = 0;
	}

	function resultVote(string memory _idVote) view public returns(uint) {
		return votesPositive[_idVote];
	}

	function payDerrama(string memory _idDerrama, address _address, uint256 precio) public payable{
		derramas[_idDerrama][_address] = derramas[_idDerrama][_address] + precio;
		
		totalMoney = totalMoney + precio;
		
		pagoDerramas[_address][_idDerrama] = pagoDerramas[_address][_idDerrama] + precio;
		emit PagoDerramas(_address, _idDerrama, precio);
	}
}

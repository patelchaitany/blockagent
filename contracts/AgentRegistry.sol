// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AgentRegistry {
    struct Agent {
        address wallet;
        string name;
        uint256 registeredAt;
        bool active;
    }

    mapping(address => Agent) public agents;
    uint256 public totalAgents;

    event AgentRegistered(address indexed wallet, string name, uint256 timestamp);
    event ActionAttested(address indexed agent, bytes32 actionType, bytes32 actionHash, uint256 timestamp);

    function register(string calldata name) external {
        require(agents[msg.sender].registeredAt == 0, "Already registered");
        agents[msg.sender] = Agent(msg.sender, name, block.timestamp, true);
        totalAgents++;
        emit AgentRegistered(msg.sender, name, block.timestamp);
    }

    function attest(bytes32 actionType, bytes32 actionHash) external {
        require(agents[msg.sender].active, "Not registered");
        emit ActionAttested(msg.sender, actionType, actionHash, block.timestamp);
    }

    function isActive(address agent) external view returns (bool) {
        return agents[agent].active;
    }
}

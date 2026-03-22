// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedValue;

    function store(uint256 num) external {
        storedValue = num;
    }

    function retrieve() external view returns (uint256) {
        return storedValue;
    }
}

// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title smart contract with a single private state variable
 * @author Marcellus Ifeanyi
 * @notice It allows anyone to update the private state variable by calling the updatePassword method
 */

contract SecurePassword {
    // private state variable
    uint256 private userPassword;

    constructor(uint256 _userPassword) {
        // Initializing the  private state variable dynamically.
        userPassword = _userPassword;
    }

    event PasswordUpdated(uint256 indexed _userPassword, address updater);

    /**
     * @param _userPassword: the new password input from the user
     *
     * @dev called by user outside the contract to update the state variable
     */
    function updatePassWord(uint256 _userPassword) external {
        // updates the private state variable with the new password input
        userPassword = _userPassword;

        // emit event upon successful password update
        emit PasswordUpdated(_userPassword, msg.sender);
    }

    /**
     * @dev returns/retrieves the passordWord value store in the private state variable
     */
    function getPassword() external view returns (uint256) {
        return userPassword;
    }
}

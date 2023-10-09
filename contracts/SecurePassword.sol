// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract SecurePassword {
    uint256 private userPassword;

    constructor(uint256 _userPassword) {
        userPassword = _userPassword;
    }

    event PasswordUpdated(uint256 indexed _userPassword, address updater);

    function updatePassWord(uint256 _userPassword) external {
        userPassword = _userPassword;

        emit PasswordUpdated(_userPassword, msg.sender);
    }

    function getPassword() external view returns (uint256) {
        return userPassword;
    }
}

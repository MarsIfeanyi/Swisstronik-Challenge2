// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract SecurePassword {
    uint256 private userPassword;

    constructor(uint256 _userPassword) {
        userPassword = _userPassword;
    }

    error PasswordAlreadyExisit();

    function updatePassWord(uint256 _userPassword) external {
        uint256 securedPassword = uint256(
            keccak256(abi.encodePacked(_userPassword))
        );

        if (securedPassword == securedPassword) revert PasswordAlreadyExisit();

        userPassword = _userPassword;
    }

    function getPassword() external view returns (uint256) {
        return userPassword;
    }
}

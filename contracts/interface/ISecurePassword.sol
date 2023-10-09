// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface ISecurePassword {
    function updatePassWord(uint256 _userPassword) external;

    function getPassword() external view returns (uint256);
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract CarCity {

    struct User {
        string username;
        uint256 timeMs;
    }

    mapping(address => User) private users;
    mapping(string => address) private addressByUsername;

    address[] private userAddressByTime;

    function setUser(address _address, string memory _username) public {
        require(addressByUsername[_username] == address(0), "This username already exists.");
        addressByUsername[_username] = _address;
        users[_address].username = _username;
        users[_address].timeMs = 0;
    }

    function setTime(address _address, uint256 _timeMs) public {
        require(_timeMs > 0, "Invalid time.");

        if (users[_address].timeMs == 0) {
            users[_address].timeMs = _timeMs;
        } else {
            require(_timeMs < users[_address].timeMs, "New time must be lower than previous time.");
            users[_address].timeMs = _timeMs;
        }

        sortUserAddressByTime();
    }

    function sortUserAddressByTime() private {
        uint256 length = userAddressByTime.length;
        for (uint256 i = 0; i < length - 1; i++) {
            for (uint256 j = 0; j < length - i - 1; j++) {
                if (users[userAddressByTime[j]].timeMs > users[userAddressByTime[j + 1]].timeMs) {
                    (userAddressByTime[j], userAddressByTime[j + 1]) = (userAddressByTime[j + 1], userAddressByTime[j]);
                }
            }
        }
    }

    function getUser(address _address) public view returns (string memory, uint256) {
        return (users[_address].username, users[_address].timeMs);
    }

    function getUsersPaginated(uint256 _pageNumber, uint256 _itemsPerPage) public view returns (string[] memory, uint256[] memory, bool, bool) {
        require(_pageNumber > 0, "Page number must be greater than zero");

        if (_itemsPerPage > 100) {
            _itemsPerPage = 100;
        }

        uint256 startIndex = (_pageNumber - 1) * _itemsPerPage;
        uint256 endIndex = startIndex + _itemsPerPage;

        if (endIndex > userAddressByTime.length) {
            endIndex = userAddressByTime.length;
        }

        string[] memory usernames = new string[](endIndex - startIndex);
        uint256[] memory times = new uint256[](endIndex - startIndex);

        for (uint256 i = startIndex; i < endIndex; i++) {
            address userAddress = userAddressByTime[i];

            if (users[userAddress].timeMs == 0) {
                continue;
            }

            usernames[i - startIndex] = users[userAddress].username;
            times[i - startIndex] = users[userAddress].timeMs;
        }

        bool hasPrevious = _pageNumber > 1;
        bool hasNext = endIndex < userAddressByTime.length;

        return (usernames, times, hasPrevious, hasNext);
    }

}
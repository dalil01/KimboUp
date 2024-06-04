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
        require(bytes(_username).length > 0, "Username required.");
        require(addressByUsername[_username] == address(0) || addressByUsername[_username] == _address, "This username already exists.");

        if (bytes(users[_address].username).length == 0) {
            users[_address].timeMs = 0;
            userAddressByTime.push(_address);
        } else {
            addressByUsername[users[_address].username] = address(0);
        }

        addressByUsername[_username] = _address;
        users[_address].username = _username;
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
        require(_pageNumber > 0, "Page number must be greater than zero.");

        if (_itemsPerPage > 100) {
            _itemsPerPage = 100;
        }

        uint256 startIndex = (_pageNumber - 1) * _itemsPerPage;

        uint256 endIndex = startIndex + _itemsPerPage;
        if (endIndex > userAddressByTime.length) {
            endIndex = userAddressByTime.length;
        }

        uint256 count = 0;
        for (uint256 i = startIndex; i < endIndex; i++) {
            if (users[userAddressByTime[i]].timeMs > 0) {
                count++;
            }
        }

        string[] memory usernames = new string[](count);
        uint256[] memory times = new uint256[](count);

        uint256 index = 0;
        for (uint256 i = startIndex; i < endIndex; i++) {
            User memory user = users[userAddressByTime[i]];
            if (user.timeMs > 0) {
                usernames[index] = user.username;
                times[index] = user.timeMs;
                index++;
            }
        }

        bool hasPrevious = _pageNumber > 1;

        bool hasNext = false;
        for (uint256 i = endIndex; i < userAddressByTime.length; i++) {
            if (users[userAddressByTime[i]].timeMs > 0) {
                hasNext = true;
                break;
            }
        }

        return (usernames, times, hasPrevious, hasNext);
    }

}
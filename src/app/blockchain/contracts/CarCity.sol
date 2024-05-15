// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract CarCity {

    struct User {
        string username;
        uint256 timeMs;
    }

    mapping(address => User) private users;

    address[] private usersByTime;

    function setUser(address _address, string memory _username) public {
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

        if (usersByTime.length == 0) {
            usersByTime.push(_address);
        } else {
            bool inserted = false;

            for (uint256 i = 0; i < usersByTime.length; i++) {
                if (users[usersByTime[i]].timeMs > _timeMs) {
                    usersByTime.push(address(0));

                    for (uint256 j = usersByTime.length - 1; j > i; j--) {
                        usersByTime[j] = usersByTime[j - 1];
                    }

                    usersByTime[i] = _address;
                    inserted = true;

                    break;
                }
            }

            if (!inserted) {
                usersByTime.push(_address);
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

        if (endIndex > usersByTime.length) {
            endIndex = usersByTime.length;
        }

        string[] memory usernames = new string[](endIndex - startIndex);
        uint256[] memory times = new uint256[](endIndex - startIndex);

        for (uint256 i = startIndex; i < endIndex; i++) {
            address userAddress = usersByTime[i];
            usernames[i - startIndex] = users[userAddress].username;
            times[i - startIndex] = users[userAddress].timeMs;
        }

        bool hasPrevious = _pageNumber > 1;
        bool hasNext = endIndex < usersByTime.length;

        return (usernames, times, hasPrevious, hasNext);
    }

}
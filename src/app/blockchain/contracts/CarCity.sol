// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract CarCity {

    struct User {
        string username;
        uint256 timeMs;
    }

    mapping(address => User) private users;
    mapping(string => address) private addressByUsername;

    address[] private usersByTime;

    function setUser(address _address, string memory _username, uint256 _timeMs) public {
        if (addressByUsername[_username] != address(0)) {
            require(addressByUsername[_username] == _address, "This username has already been taken.");
        }

        require(_timeMs <= 0, "Invalid time.");
        require(_timeMs >= users[_address].timeMs, "This time is higher or equal than your best time.");

        users[_address].username = _username;
        users[_address].timeMs = _timeMs;

        addressByUsername[_username] = _address;

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

    function getUser(address _user) public view returns (string memory, uint256) {
        return (users[_user].username, users[_user].timeMs);
    }

    function getUsersPaginated(uint256 _pageNumber, uint256 _itemsPerPage) public view returns (uint256[] memory, bool, bool) {
        require(_pageNumber > 0, "Page number must be greater than zero");

        uint256 startIndex = (_pageNumber - 1) * _itemsPerPage;
        uint256 endIndex = startIndex + _itemsPerPage;

        if (endIndex > usersByTime.length) {
            endIndex = usersByTime.length;
        }

        //string[] memory usernames = new string[](endIndex - startIndex);
        uint256[] memory times = new uint256[](endIndex - startIndex);

        for (uint256 i = startIndex; i < endIndex; i++) {
            address userAddress = usersByTime[i];
            //usernames[i - startIndex] = users[userAddress].username;
            times[i - startIndex] = users[userAddress].timeMs;
        }

        bool hasPrevious = _pageNumber > 1;
        bool hasNext = endIndex < usersByTime.length;

        return (times, hasPrevious, hasNext);
    }

}
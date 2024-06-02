document.addEventListener('DOMContentLoaded', () => {
    const friendsContainer = document.getElementById('friends-container');
    const addFriendButton = document.getElementById('add-friend');
    const billsContainer = document.getElementById('bills-container');
    const addBillButton = document.getElementById('add-bill');
    const splitResult = document.getElementById('split-result');
    const detailedTotals = document.getElementById('detailed-totals');
    const saveDataButton = document.getElementById('save-data');
    const loadDataButton = document.getElementById('load-data');

    let friends = JSON.parse(localStorage.getItem('friends')) || [];
    let bills = JSON.parse(localStorage.getItem('bills')) || [];

    addFriendButton.addEventListener('click', () => {
        const friendName = prompt('Enter friend\'s name:');
        if (friendName) {
            friends.push(friendName);
            updateFriendsList();
            saveData();
        }
    });

    addBillButton.addEventListener('click', () => {
        const billDescription = prompt('Enter bill description:');
        const billAmount = parseFloat(prompt('Enter bill amount:'));
        if (billDescription && !isNaN(billAmount)) {
            const billers = [];
            friends.forEach(friend => {
                const amountPaid = parseFloat(prompt(`Enter amount ${friend} paid for this bill:`));
                if (!isNaN(amountPaid) && amountPaid > 0) {
                    billers.push({ name: friend, amount: amountPaid });
                }
            });

            if (billers.length > 0) {
                bills.push({ description: billDescription, amount: billAmount, billers: billers });
                updateBillsList();
                saveData();
            }
        }
    });

    saveDataButton.addEventListener('click', saveData);
    loadDataButton.addEventListener('click', loadData);

    function updateFriendsList() {
        friendsContainer.innerHTML = '';
        friends.forEach((friend, index) => {
            const friendElement = document.createElement('div');
            friendElement.className = 'flex justify-between bg-gray-100 p-2 rounded';
            friendElement.innerHTML = `
                <span>${friend}</span>
                <div>
                    <button class="text-yellow-500" onclick="editFriend(${index})">Edit</button>
                    <button class="text-red-500" onclick="removeFriend(${index})">Remove</button>
                </div>
            `;
            friendsContainer.appendChild(friendElement);
        });
    }

    function updateBillsList() {
        billsContainer.innerHTML = '';
        bills.forEach((bill, index) => {
            const billElement = document.createElement('tr');
            const billers = bill.billers.map(biller => `${biller.name} ($${biller.amount.toFixed(2)})`).join(', ');
            billElement.innerHTML = `
                <td class="py-2">${bill.description}</td>
                <td class="py-2">$${bill.amount.toFixed(2)}</td>
                <td class="py-2">${billers}</td>
                <td class="py-2">
                    <button class="text-yellow-500" onclick="editBill(${index})">Edit</button>
                    <button class="text-red-500" onclick="removeBill(${index})">Remove</button>
                </td>
            `;
            billsContainer.appendChild(billElement);
        });
        calculateSplit();
    }

    function calculateSplit() {
        if (friends.length === 0 || bills.length === 0) {
            splitResult.innerHTML = 'Add friends and bills to see the split.';
            detailedTotals.innerHTML = '';
            return;
        }

        const friendTotals = friends.reduce((acc, friend) => {
            acc[friend] = { paid: 0, owes: 0 };
            return acc;
        }, {});

        bills.forEach(bill => {
            const splitAmount = bill.amount / friends.length;
            friends.forEach(friend => {
                friendTotals[friend].owes += splitAmount;
            });
            bill.billers.forEach(biller => {
                friendTotals[biller.name].paid += biller.amount;
            });
        });

        splitResult.innerHTML = '';
        friends.forEach(friend => {
            const balance = friendTotals[friend].paid - friendTotals[friend].owes;
            const friendResultElement = document.createElement('div');
            friendResultElement.className = 'bg-gray-100 p-2 mt-2 rounded';
            friendResultElement.innerHTML = `<span>${friend} balance: $${balance.toFixed(2)}</span>`;
            splitResult.appendChild(friendResultElement);
        });

        detailedTotals.innerHTML = '<h3 class="text-lg font-semibold mb-2">Detailed Totals</h3>';
        friends.forEach(friend => {
            const friendTotalElement = document.createElement('div');
            friendTotalElement.className = 'bg-gray-100 p-2 mt-2 rounded';
            friendTotalElement.innerHTML = `<span>${friend} owes: $${friendTotals[friend].owes.toFixed(2)}, paid: $${friendTotals[friend].paid.toFixed(2)}</span>`;
            detailedTotals.appendChild(friendTotalElement);
        });
    }

    window.editFriend = (index) => {
        const newName = prompt('Enter new name for friend:', friends[index]);
        if (newName) {
            friends[index] = newName;
            updateFriendsList();
            saveData();
        }
    };

    window.removeFriend = (index) => {
        friends.splice(index, 1);
        updateFriendsList();
        calculateSplit();
        saveData();
    };

    window.editBill = (index) => {
        const billDescription = prompt('Enter new bill description:', bills[index].description);
        const billAmount = parseFloat(prompt('Enter new bill amount:', bills[index].amount));
        if (billDescription && !isNaN(billAmount)) {
            const billers = [];
            friends.forEach(friend => {
                const amountPaid = parseFloat(prompt(`Enter amount ${friend} paid for this bill:`, bills[index].billers.find(b => b.name === friend)?.amount || 0));
                if (!isNaN(amountPaid) && amountPaid > 0) {
                    billers.push({ name: friend, amount: amountPaid });
                }
            });

            if (billers.length > 0) {
                bills[index] = { description: billDescription, amount: billAmount, billers: billers };
                updateBillsList();
                saveData();
            }
        }
    };

    window.removeBill = (index) => {
        bills.splice(index, 1);
        updateBillsList();
        calculateSplit();
        saveData();
    };

    function saveData() {
        localStorage.setItem('friends', JSON.stringify(friends));
        localStorage.setItem('bills', JSON.stringify(bills));
    }

    function loadData() {
        friends = JSON.parse(localStorage.getItem('friends')) || [];
        bills = JSON.parse(localStorage.getItem('bills')) || [];
        updateFriendsList();
        updateBillsList();
    }

    // Initial load
    loadData();
});

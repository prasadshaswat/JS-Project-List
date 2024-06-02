class FamilyTreeNode {
    constructor(name) {
        this.name = name;
        this.children = [];
    }
}

let familyTree = null;

function addMember() {
    const name = document.getElementById("nameInput").value.trim();
    const parentName = document.getElementById("parentInput").value.trim();

    if (name === "" || parentName === "") {
        alert("Please enter both name and parent name.");
        return;
    }

    if (!familyTree) {
        familyTree = new FamilyTreeNode(parentName);
        familyTree.children.push(new FamilyTreeNode(name));
    } else {
        const parentNode = findNode(familyTree, parentName);
        if (parentNode) {
            parentNode.children.push(new FamilyTreeNode(name));
        } else {
            alert("Parent not found.");
            return;
        }
    }

    displayTree();
}

function findNode(node, name) {
    if (node.name === name) {
        return node;
    } else {
        for (let i = 0; i < node.children.length; i++) {
            const foundNode = findNode(node.children[i], name);
            if (foundNode) {
                return foundNode;
            }
        }
        return null;
    }
}

function displayTree() {
    const treeContainer = document.getElementById("tree");
    treeContainer.innerHTML = "";
    buildTreeHTML(familyTree, treeContainer);
}

function buildTreeHTML(node, container) {
    const nodeElement = document.createElement("div");
    nodeElement.className = "node";
    nodeElement.innerHTML = `<span>${node.name}</span>`;

    if (node.children.length > 0) {
        const childrenList = document.createElement("ul");
        node.children.forEach(child => {
            const listItem = document.createElement("li");
            buildTreeHTML(child, listItem);
            childrenList.appendChild(listItem);
        });
        nodeElement.appendChild(childrenList);
    }

    container.appendChild(nodeElement);
}

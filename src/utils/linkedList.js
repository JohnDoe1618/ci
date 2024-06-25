class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addNode(data) {
    const newNode = new Node(data);
    this.length += 1;

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  displayList(callback) {
    let current = this.head;
    while (current) {
      callback(current.data);
      current = current.next;
    }
  }
}
export default DoublyLinkedList;

var Node = function(prompt, reply, val, consequence, img, immediate) {
  this.prompt = prompt;
  this.reply = reply;
  this.val = val;
  this.consequence = consequence;
  this.left = null;
  this.right = null;
  this.immediate = immediate;
  this.img = img;
}

var buildTree = function(json) {
  var res = [];
  var leftIndex = -1;
  var rightIndex = -1;
  var recurseThrough = function(node) {
    if (!node) {
      return;
    }
    var newNode = new Node(node.prompt, node.reply, node.val, node.consequence, node.img, node.immediate);
    if (!node.choices) {
      return newNode;
    }

    newNode.left = !!node ? recurseThrough(node.choices[0]) : null;
    newNode.right = !!node ? recurseThrough(node.choices[1]) : null;
    return newNode;
  }

  for (var key in json) {
    res.push(recurseThrough(json[key]));
  }
  return res;
}

module.exports = buildTree;


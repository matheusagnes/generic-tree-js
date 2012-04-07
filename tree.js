//nodeId = 0;
function Node (value) 
{
    this.parent = null;
    this.element = value,
    this.children = new Array(),

    this.toString = function()
    {
        return this.element;
    }
	
    this.addChild = function(node)
    {
        this.children.push(node);
    }

    this.setParent = function(node)
    {
        this.parent = node;
    }
    
    this.getParent = function()
    {
        return this.parent;
    }
	
    this.getChildren = function()
    {
        return this.children;	
    }

    this.getElement = function()
    {
        return this.element;	
    }
    
    this.setElement = function(value)
    {
        this.element = value;
    }


}

function Tree(root)
{
    this.root = root;
    this.size = 1;
    
    this.getNodes = function(node, arrayOfNodes)
    {
        if(node == this.root)
        {
            arrayOfNodes.push(node)
        }
        else
        {
            arrayOfNodes.push(node);
        }
        
        if(node.getChildren().length > 0)
        {
            for(var i = 0; i < node.getChildren().length; i++)
            {
                this.getNodes(node.getChildren()[i], arrayOfNodes);
            }
        }
        return arrayOfNodes;
    };
    
    this.getElements = function(node, arrayOfElements)
    {
        if(node == this.root)
        {
            arrayOfElements.push(node.getElement())
        }
        else
        {
            arrayOfElements.push(node.getElement());
        }
        
        if(node.getChildren().length > 0)
        {
            for(var i = 0; i < node.getChildren().length; i++)
            {
                this.getElements(node.getChildren()[i], arrayOfElements);
            }
        }
        return arrayOfElements;
    };
    
    this.show = function(node)
    {        
        if(node == this.root)
        {
            x = '<ul id="org" style="display:none;">';
            x += '<li>'+ '<div class="element">'+node.element+'</div>';
        }
        else
        {
            x += '<li>'+ '<div class="element">'+node.element+'</div>';
        }
        
        if(node.getChildren().length > 0)
        {
            x += '<ul>';        
                        
            for(var i = 0; i < node.getChildren().length; i++)
            {
                this.show(node.getChildren()[i]);
            }
            x += '</ul>';    
        }
        return x;
    };

    this.addChild = function(node, element)
    {
        var childNode = new Node(element);
        childNode.setParent(node);

        node.addChild(childNode);

        this.size++;

        return childNode;
    };
    
    this.swapElements = function(node1,node2)
    {
        var node1Element = node1.getElement();
        
        node1.setElement(node2.getElement());
        node2.setElement(node1Element);
    };
    
    /*
     * This function changes the element of one node for  new value
     */
    this.replaceElement = function(node, value)
    {
        var oldValue = node.getElement();
        node.setElement(value);
        
        return oldValue;
    };
    
    /*
     * Return true if the node is the root of the tree
     * and false it isn't the root
     */
    this.isRoot = function(node)
    {
        if(root == node)
        {
            return true;
        }
        return false;
    }
    
    /*
     * Return true if the node is enternal
     * and false if the node is ixternal
     */
    this.isInternal = function(node)
    {
        if(node.getChildren().length > 0)
        {
            return true;
        }
        return false;
    }
    
    /*
     * Return true if the node is external
     * and false if the node is internal
     */
    this.isExternal = function(node)
    {
        if(node.getChildren().length == 0)
        {
            return true;
        }
        return false;
    }
    
    /*
     * Remove one external node
     */
    this.removeExternal = function(node)
    {
        if(tree.isExternal(node))
        {
            var father = node.getParent();
            for(var i = 0;  i < father.getChildren().length; i++)
            {   
                if(father.getChildren()[i] == node)
                {
                    father.getChildren()[i] = null;
                    for(var x = i; x < father.getChildren().length; x++)
                    {
                        father.getChildren()[x] = father.getChildren()[x+1];
                    }
                    father.getChildren().pop();
                    this.size--;
                    return true;
                }
            }
        }
        else
        {
            alert('Impossível deletar este node ele não é externo!')
        }
        return false;
    };
    
    /*
     * Return the size of the tree
     */
    this.getSize = function()
    {
        return this.size;
    };
    
    
    /*
     * Return all nodes of the tree in a array
     */
    this.positions = function()
    {
        return this.getNodes(this.root, new Array());
    };
    
    this.elements = function()
    {
        return this.getElements(this.root, new Array());
    }
    
    this.parent = function(node)
    {     
        return node.getParent();
    }
    
    this.children = function(node)
    {
        return node.getChildren();
    }
    
    this.showTree = function()
    {
        
        jQuery(document).ready(function() {
            $('#tree').html('');
            $('#org_tree').html(tree.show(tree.root));

            $("#org").jOrgChart({
                chartElement : '#tree',
                dragAndDrop  : false
            });
        });
    }
    
}


var a = new Node("A");
tree = new Tree(a);

var b = tree.addChild(a, "B");
var c = tree.addChild(tree.parent(b), "C");
var d = tree.addChild(b, "D");

console.log("a is root? " + tree.isRoot(a));
console.log("c is ext.? " + tree.isExternal(c));
console.log("d is int.? " + tree.isInternal(d));
console.log("tree size=" + tree.getSize());

console.log("children of a: " + tree.children(a));
console.log("tree elements: " + tree.elements());
var node_list = tree.positions();
console.log("# of nodes=" + node_list.length);

tree.swapElements(a, b);
console.log("a now contains " + a);
console.log("b now contains " + b);
        
var s = tree.replaceElement(c, "CC");
console.log("c now contains " + c + " but previoulsy had " + s);
        
console.log("b has " + tree.children(b).length + " child nodes");
tree.removeExternal(d);
console.log("b now has " + tree.children(b).length + " child nodes");



tree.showTree();
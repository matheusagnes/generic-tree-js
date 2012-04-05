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
        node.setElement(value);
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
       
            $('#org_tree').append(tree.show(tree.root));

            $("#org").jOrgChart({
                chartElement : '#tree',
                dragAndDrop  : false
            });
        });
    }
}


root = new Node(0);
tree = new Tree(root);

node1 = tree.addChild(root,1);
node2 = tree.addChild(root,2);
node3 = tree.addChild(root,3);
node4 = tree.addChild(node3,4);
node5 = tree.addChild(node4,5);
node6 = tree.addChild(node4,6);
node7 = tree.addChild(node6,7);
node8 = tree.addChild(node2,8);
node9 = tree.addChild(node2,9);

console.log(tree.positions())
console.log(tree.elements());

tree.showTree();

//console.log(tree.size);
//tree.removeExternal(node7);

//console.log(tree.isInternal(root));

//tree.swapElements(root, node7);
//tree.replaceElement(root, 99);

//console.log(tree.isRoot(root));
//tree.getNodes(tree.root);

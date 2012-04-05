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
    
    this.addChild = function(Node)
    {
        this.children.push(Node);
    };
    
    this.getNodes = function(node)
    {
        if(node == this.root)
        {
            console.log(node.getElement());
        }
        else
        {
            console.log(node.getElement());
        }
        
        if(node.getChildren().length > 0)
        {
            for(var i = 0; i < node.getChildren().length; i++)
            {
                this.getNodes(node.getChildren()[i]);
            }
        }
        return 'success';
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
    
    this.replaceElement = function(node, value)
    {
        node.setElement(value);
    };
    
    this.isRoot = function(node)
    {
        if(root == node)
        {
            return true;
        }
        return false;
    }
    
    this.isInternal = function(node)
    {
        if(node.getChildren().length > 0)
        {
            return true;
        }
        return false;
    }
    
    this.isExternal = function(node)
    {
        if(node.getChildren().length == 0)
        {
            return true;
        }
        return false;
    }
    
    this.removeExternal = function(node)
    {
        var father = node.getParent();
        for(var i = 0; father.getChildren().length < i; i++)
        {
            if(father.getChildren()[i] == node)
            {
                father.getChildren()[i] = null;
                for(var x = i; x < father.getChildren().length; x++)
                {
                    father.getChildren()[x] = father.getChildren()[x+1];
                }
                return;
            }
        }
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

//console.log(tree.isInternal(root));

//tree.swapElements(root, node7);
//tree.replaceElement(root, 99);

//console.log(tree.isRoot(root));
//tree.getNodes(tree.root);

jQuery(document).ready(function() {
       
    $('#org_tree').append(tree.show(tree.root));

    $("#org").jOrgChart({
        chartElement : '#tree',
        dragAndDrop  : false
    });
});
    
    






//
//var children = new Array();
//
//function Tree(root) 
//{
//    this.root=root;
//    this.children = children;
//    this.add=add;
//}
//function add(node) 
//{
//    with (this) Tree.children[0] = node;
//}
//
//
//tree = new Tree('root');
//tree.add(1);
//tree.add(4);
//tree.add(3);
//
//console.log(Tree.children);
//
//this.show = function(node)
//    {        
//        if(node == this.root)
//        {
//            ul_root = $('<ul>').attr('id','org').attr('style','display:none;');
//            li_root = $('<li>').append(node.element);
//        }
//
//        for(var i = 0; i < node.children.length; i++)
//        {
//            
//            li = $('<li>');
//            li.append(node.children[i].element);
//            
//            if(node.children[i].parent == this.root)
//            {
//                ul = $('<ul>');
//                ul.append(li)
//                li_root.append(ul);
//            }
//            else
//            {
//                ul.append(li);
//            }
//            
//            if(node.children[i].children.length > 0)
//            {
//                ul = $('<ul>');
//                li.append(ul);
//                this.show(node.children[i]);
//            }
//           
//        }
//        
//        return ul_root.append(li_root);
//    };

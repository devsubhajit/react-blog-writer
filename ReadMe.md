# React Blog Writer

## **Description:** 
**react-blog-writer** is a very useful and easy to use for text editing for any kind of blog or post.

### **How to install?**
```
npm i react-blog-writer
```
### **Link with material icons**
Copy and paset this material icons cdn link on head tag.
```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```

### **Implementation**

```
import React, {useState} from 'react';
import BlogWriter from 'react-blog-writer';


const App = () => {
    let [nodes, setNodes] = useState(null);

    return (
        ....
        <BlogWriter finalNodes={setNodes} placeHolder={"Type here..."}/>
    )
}
export default App;
```
The property **finalNodes** is used to get html string from the library and store it to your current variable. In this example it will get stored in **nodes** variable.

The **placeHolder** property is to set default value on your write pad. 

After getting your html string, you can store it to your database. 

For using html string in your react JSX you can use **dangerouslySetInnerHTML**
Here is the documentation for this: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml


## **Theming:** 
There is a little on this section. Mainly on primary colors and width and height.
```
:root {
   --writer-primary:#5644c1;
  --writer-width:600px;
  --writer-height:400px;
}
```

This library is using a **react-color-selector**. If you want to use this library seperately here in your application here what you can do.

```
   npm install react-color-selector
```
Here is the link of this library: https://www.npmjs.com/package/react-color-selector

## **Raise an Issue**
If you are facing any issue regarding installation and usage, raise your issue in **Git repo**. 
```
https://github.com/devsubhajit/react-blog-writer/issues
```

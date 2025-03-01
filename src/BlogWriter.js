import React, { useState, useEffect } from 'react';
import ColorSelector from 'react-color-selector';
import './blogWriter.css';

const BlogWriter = (props) => {
    const { noColor, noSize, noHeading, noAlign } = props.options;
    let [editValue, setEditValue] = useState('');
    let [sizeValue, setSizeValue] = useState(1);
    let [isEdit, set_isEdit] = useState(false);
    let [isFontSize, set_isFontSize] = useState(false);
    let [link_elem, set_link_elem] = useState(null);
    let [count, setCount] = useState(0);
    let [myColor, pickedColor] = useState('');
    let [colorPicker, set_colorPicker] = useState(false);
    let [titlePicker, set_titlePicker] = useState(false);
    let [placeHolder, setPlaceHolder] = useState(props.placeHolder ? props.placeHolder : 'Write your text here...');
    let [nodes, setNodes] = useState();
    let picker_data = {
        col: 8,
        row: 8,
        width: 200,
        height: 200,
        view: 'palette',
        theme: 'light',
        title: '',
        cellControl: 4
    }

    useEffect(() => {
        let nodesElem = document.getElementById('rwp');
        setNodes(nodesElem.innerHTML);
        props.finalNodes(nodesElem.innerHTML);
    }, [count]);

    const apply_decoration = (type) => {
        if (type === 'b') {
            document.execCommand('bold', false, '');
        }
        if (type === 'i') {
            document.execCommand('italic', false, '');
        }
        if (type === 'u') {
            document.execCommand('underline', false, '');
        }

        setCount(count + 1);

    }
    const apply_alignments = (type) => {
        if (type === 'c') {
            document.execCommand('justifyCenter', false, '');
        }
        if (type === 'l') {
            document.execCommand('justifyLeft', false, '');
        }
        if (type === 'r') {
            document.execCommand('justifyRight', false, '')
        }
        setCount(count + 1);
    }
    const apply_list = (type) => {
        if (type === 'o') {
            document.execCommand('insertOrderedList', false, '');
        }
        if (type === 'un') {
            document.execCommand('insertUnorderedList', false, '');
        }
        setCount(count + 1);
    }
    const apply_color = () => {
        let snode = getSelection();
        if (snode.baseNode === null || snode.baseNode.parentElement.getAttribute('data-type') === 'option') return false;

        set_colorPicker(colorPicker = true);
        let element;
        if (snode.baseNode !== null && snode.baseNode.parentElement.getAttribute('id') !== null) {
            element = document.getElementById(snode.baseNode.parentElement.getAttribute('id'));
        } else {
            document.execCommand('insertHTML', false, '<span id="cr' + count + '" >' + snode + '</span>');
            if (snode.baseNode.parentElement) {
                snode.baseNode.parentElement.setAttribute('id', 'cr' + count);
                snode.baseNode.parentElement.style.removeProperty('font-size');
            }
            let id = 'cr' + count;
            element = document.getElementById(id);
        }



        set_link_elem(link_elem = element);
        setCount(count + 1)
    }
    const setColor = (v) => {
        if (v === 0) {
            link_elem.style.color = myColor;
            set_colorPicker(colorPicker = false);
            set_link_elem(link_elem = null);
        } else {
            set_colorPicker(colorPicker = false);
            set_link_elem(link_elem = null);
        }
        setCount(count + 1);

    }

    const apply_link = () => {
        let snode = getSelection();
        if (snode.baseNode === null || snode.baseNode.parentElement.getAttribute('data-type') === 'option') return false;

        setEditValue(editValue = '');
        set_isEdit(isEdit = true);

        // let element;
        if (snode.baseNode.parentElement.getAttribute('id') !== null) {
            let prev_style = snode.baseNode.parentElement.getAttribute('style');
            let inner_html = snode.baseNode.parentElement.innerHTML;
            let hrf;

            if (snode.baseNode.parentElement.getAttribute('href') != null) {
                setEditValue(editValue = snode.baseNode.parentElement.getAttribute('href'));
                hrf = editValue;
            } else {
                hrf = snode;
            }
            document.execCommand('insertHTML', false, '<a id="link' + count + '" href="' + hrf + '" target="_blank" style="' + prev_style + '">' + inner_html + '</a>');

        } else {
            document.execCommand('insertHTML', false, '<a id="link' + count + '" href="' + snode + '" target="_blank">' + snode + '</a>');

        }

        // document.execCommand('insertHTML', false, '<a id="link' + count + '" href="' + snode + '" target="_blank">' + snode + '</a>');
        let id = 'link' + count;
        let element = document.getElementById(id);
        set_link_elem(link_elem = element);
        setCount(count + 1)
    }
    const submit_applly_link = (event) => {
        event.persist();
        if (event.key === 'Enter') {
            if (editValue !== '') {
                link_elem.setAttribute('href', editValue)
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
                setCount(count + 1);
            } else {
                link_elem.parentElement.innerHTML = link_elem.innerHTML
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            }

        }


    }
    const submit_applly_link_click = (v) => {

        if (v === 'ok') {
            if (editValue !== '') {
                link_elem.setAttribute('href', editValue)
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            } else {
                link_elem.parentElement.innerHTML = link_elem.innerHTML
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            }
        } else {
            if (editValue !== '') {
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            } else {
                link_elem.parentElement.innerHTML = link_elem.innerHTML
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            }
        }
        setCount(count + 1);

    }

    const apply_font_size = () => {
        let snode = getSelection();
        if (snode.baseNode === null || snode.baseNode.parentElement.getAttribute('data-type') === 'option') return false;

        setSizeValue(sizeValue = '');
        set_isFontSize(isFontSize = true);
        let element;
        if (snode.baseNode.parentElement.getAttribute('id') !== null) {
            element = document.getElementById(snode.baseNode.parentElement.getAttribute('id'));
        } else {
            document.execCommand('insertHTML', false, '<span id="size' + count + '">' + snode + '</span>');
            if (snode.baseNode.parentElement) {
                snode.baseNode.parentElement.setAttribute('id', 'size' + count);
            }
            let id = 'size' + count;
            element = document.getElementById(id);
        }

        set_link_elem(link_elem = element);
        setCount(count + 1)
    }
    const submit_font_size = (event) => {
        link_elem.style.fontSize = event.target.value + 'px';
        setSizeValue(sizeValue = event.target.value);
        setCount(count + 1);
    }
    const submit_font_size_click = (v) => {

        if (v === 'ok') {
            if (editValue !== '') {
                link_elem.setAttribute('href', editValue)
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            } else {
                link_elem.parentElement.innerHTML = link_elem.innerHTML
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            }
        } else {
            if (editValue !== '') {
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            } else {
                link_elem.parentElement.innerHTML = link_elem.innerHTML
                set_isEdit(isEdit = false);
                set_link_elem(link_elem = null);
            }
        }


    }
    //  title 
    const apply_title = () => {
        let snode = getSelection();
        if (snode.baseNode === null || snode.baseNode.parentElement.getAttribute('data-type') === 'option') return false;

        set_titlePicker(titlePicker = true);
        let element;
        if (snode.baseNode.parentElement.getAttribute('id') !== null) {
            element = document.getElementById(snode.baseNode.parentElement.getAttribute('id'));
        } else {
            let id = 'title' + count;
            snode.baseNode.parentElement.setAttribute('id', id)
            element = document.getElementById(id);
        }
        set_link_elem(link_elem = element);
        setCount(count + 1)
    }
    const submit_title = (tag) => {
        // Grab the original element
        let original = link_elem;
        // Create a replacement tag of the desired type
        let replacement = document.createElement(tag);
        // Grab all of the original's attributes, and pass them to the replacement
        for (var i = 0, l = original.attributes.length; i < l; ++i) {
            let nodeName = original.attributes.item(i).nodeName;
            let nodeValue = original.attributes.item(i).nodeValue;
            replacement.setAttribute(nodeName, nodeValue);
        }
        // Persist contents
        replacement.innerHTML = original.innerHTML;
        // Switch!
        original.parentNode.replaceChild(replacement, original);
        set_titlePicker(titlePicker = false);
        set_link_elem(link_elem = null);
        setCount(count + 1);
    }

    // image
    const getImage = (e) => {
        let editBoard = document.getElementsByClassName('writePad')[0];
        // var file = document.querySelector("input[type=file]").files[0];
        var file = e.target.files[0];
        var reader = new FileReader();

        let dataURI;
        reader.addEventListener(
            "load",
            function () {
                dataURI = reader.result;

                const div = document.createElement("div");
                const innerDiv = document.createElement("div");
                const img = document.createElement("img");

                img.src = dataURI;
                img.style = "margin:auto";
                div.className = 'imgcontaner';



                div.appendChild(img);
                editBoard.appendChild(div);
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }

    }

    const keyboardEvents = (event) => {
        event.persist();
        setCount(count + 1);
    }

    const createMarkup = (content) => {
        return { __html: content };
    }

    return (

        <React.Fragment>
            <div className="editor_container">
                <div className="editorAttrs">
                    {/* alignments */}
                    {/* <button type="button" className="material-icons btns" onClick={()=>{apply_alignments('j')}}>format_align_justify</button> */}

                    {!noAlign &&
                        <React.Fragment>
                            <button type="button" data-type="option" className="btns" onClick={() => { apply_alignments('l') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                            <button type="button" data-type="option" className="btns" onClick={() => { apply_alignments('r') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                            <button type="button" data-type="option" className=" btns" onClick={() => { apply_alignments('c') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </button>
                        </React.Fragment>
                    }
                    {/* text formate */}
                    <button type="button" data-type="option" className=" btns" onClick={() => { apply_decoration('b') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
                        </svg>
                    </button>
                    <button type="button" data-type="option" className=" btns" onClick={() => { apply_decoration('i') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
                        </svg>
                    </button>
                    <button type="button" data-type="option" className="btns" onClick={() => { apply_decoration('u') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z" />
                        </svg>
                    </button>
                    {/* lists */}
                    <button type="button" data-type="option" className="btns" onClick={() => { apply_list('un') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                    </button>
                    <button type="button" data-type="option" className="btns" onClick={() => { apply_list('o') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                            <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
                        </svg>
                    </button>

                    {/* font */}
                    {!noColor &&
                        <button type="button" data-type="option" className="btns" onClick={() => apply_color()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z" />
                            </svg>
                        </button>
                    }
                    {!noSize &&
                        <button type="button" data-type="option" className="btns" onClick={() => apply_font_size()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                                <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </button>
                    }
                    {!noHeading &&
                        <button type="button" data-type="option" className="btns" onClick={() => apply_title()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 10 16">
                                <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.244z" />
                            </svg>
                        </button>
                    }
                    {/* <label htmlFor="sd_file" className="material-icons btns">insert_photo</label> */}
                    {/* <input type="file" accept="image/*" onChange={(e) => getImage(e)} id="sd_file" style={{ display: 'none' }} /> */}
                    {/* link */}
                    <button type="button" data-type="option" className="btns" onClick={() => { apply_link() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                        </svg>
                    </button>
                    {/* <button type="button" data-type="option" className="material-icons btns">format_quote</button>
                    <button type="button" data-type="option" className="material-icons btns">code</button>
                    <button type="button" data-type="option" className="material-icons btns">help</button> */}
                    {colorPicker &&
                        <div className="color_popup">
                            <div>
                                <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
                                {link_elem !== null &&
                                    <button type="button" className="colorSubmit" style={{ color: myColor }} onClick={() => setColor(0)}>OK</button>
                                }
                                {link_elem === null &&
                                    <button type="button" className="colorSubmit" style={{ color: myColor }} disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
                                        </svg>
                                    </button>
                                }

                                <button type="button" className="cancelSubmit" onClick={() => setColor(1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    }
                    {titlePicker &&
                        <div className="title-picker">
                            <div>
                                <ul>
                                    <li onClick={() => submit_title('h1')}><h1>Title</h1></li>
                                    <li onClick={() => submit_title('h2')}><h2>Title</h2></li>
                                    <li onClick={() => submit_title('h3')}><h3>Title</h3></li>
                                    <li onClick={() => submit_title('h4')}><h4>Title</h4></li>
                                    <li onClick={() => submit_title('h5')}><h5>Title</h5></li>
                                    <li onClick={() => submit_title('h6')}><h6>Title</h6></li>
                                </ul>
                            </div>
                        </div>
                    }

                </div>
                <div className="writePad" id="rwp" suppressContentEditableWarning={true} contentEditable onKeyDown={keyboardEvents}>
                    <div dangerouslySetInnerHTML={createMarkup(placeHolder)}></div>
                </div>
                {isEdit &&
                    <div className="edit_input">
                        <span>Enter url: </span>
                        <input type="text" value={editValue} onChange={(e) => { setEditValue(editValue = e.target.value) }} onKeyPress={submit_applly_link} />
                        <button type="button" onClick={() => submit_applly_link_click('ok')}>OK</button>
                        <button type="button" onClick={() => submit_applly_link_click('clear')}>&nbsp;X&nbsp;</button>
                    </div>
                }
                {isFontSize &&
                    <div className="edit_input">
                        <button type="button" className="btns" style={{ top: '-10px' }}>{sizeValue}px</button>
                        <input type="range" min="1" max="100" value={sizeValue} onChange={submit_font_size} />
                        <button type="button" className="btns active" style={{ top: '-10px' }} onClick={(e) => {
                            e.preventDefault();
                            set_isFontSize(isFontSize = false);
                            set_link_elem(link_elem = null)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </button>
                        {/* <input type="range" min="1" max="100" value="1" onChange={(e) => { setSizeValue(sizeValue = e.target.value) }} onChange={submit_font_size} /> */}
                    </div>
                }

            </div>
        </React.Fragment>
    )
}
export default BlogWriter;
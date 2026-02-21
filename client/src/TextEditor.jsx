import React, { useCallback, useDebugValue, useEffect, useState } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import {io} from "socket.io-client";

import { useParams } from 'react-router-dom';

import {BrowserRouter, Routes,} from "react-router-dom"

function TextEditor() {

  const [socket,setSocket] = useState();
  const [quill, setQuill] = useState();

  const {id :docId} = useParams();
  console.log(docId)

  useEffect(() => {
    const s = io("INSERTYOURURL");
    setSocket(s);
    

    return () => {
      s.disconnect()
    }
  }, [])

    const TOOLBAR_OPTIONS = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block"],
        ["clean"],
      ]

    const warpperRef = useCallback((wrapper) => {
        if(wrapper == null){
            return;
        }
        wrapper.innerHTML = "";
        const editor = document.createElement("div")
        wrapper.append(editor)

        const q = new Quill(editor, 
            {theme:"snow", modules:{toolbar:TOOLBAR_OPTIONS}})
        setQuill(q);
        q.disable();
        q.setText("Loading...")
        // console.log(quill);

    }, [])
    useEffect(() => {
      if(quill == null || socket == null){
         return
      }
      
      const handler = (delta, oldDelta, source) => {
           if(source!== "user") return;
           socket.emit("text-changes", delta);
      }
      quill.on("text-change", handler);

      return () => {
        quill.off("text-change", handler)
      }
       
      }, [quill, socket])

      useEffect(() => {
        if(socket == null || quill == null) return;

        const handler = (delta) => {
          quill.updateContents(delta);
        }
        socket.on("recieve-changes",handler);

        return () => {
          socket.off("recieve-changes", handler);
        }
      }, [quill,socket])

     useEffect(() => {
      if(socket == null || quill == null) return;

      socket.once("load-doc", document => {
        console.log(document)
        quill.setContents(document);
        quill.enable();
      })

      socket.emit("get-doc", docId);
     },[socket, quill, docId])

     useEffect(() => {
      if(socket == null || quill == null) return;
      console.log(quill.getContents())

      const interval = setInterval(() => {
        socket.emit("save-doc", quill.getContents())
      }, 2000);

      return () => {
        clearInterval(interval);
      }

      
     }, [socket, quill])


  return (
    <div id='container' ref={warpperRef}>
   
    </div>
    
  )
}

export default TextEditor
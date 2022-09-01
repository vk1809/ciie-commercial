
import * as React from 'react';
// import {useState} from 'react';
import * as ReactDropzone from 'react-dropzone'
import {  Attachment } from "@fluentui/react-northstar"; 
import {
  WordColorIcon,
  ExcelColorIcon,
  PowerPointColorIcon,
  FilesPdfColoredIcon,
  FilesImageIcon, 
  // MoreIcon,
  CloseIcon,
  PaperclipIcon
  // FilesUploadIcon
} from "@fluentui/react-icons-northstar";
import './main.css'

// pdf, jpeg, jpg, png, doc, xlsx, xls, docx
const Attachments= (props) => {
    const [ files, setFiles ] = React.useState([])
    const [showMsg, setShowMsg] = React.useState(false)
    const [tempFile, setTempFile] = React.useState([])
    const extArray = ["pdf", "jpeg","jpg", "png", "doc", "xlsx", "xls", "docx"]
    
    const { getRootProps, getInputProps } = ReactDropzone.useDropzone({
      onDrop: (acceptedFiles: any) => {
        for(let i = 0; i< acceptedFiles.length; i++) {
          let skip = 0  
              for(let j=0; j< tempFile.length; j++) {
                if(tempFile[j].path === acceptedFiles[i].path) {
                  alert(`File with "${acceptedFiles[j].path}" name already exists!`)
                  skip = 1
                  break
                }
              }
              if(skip === 0) {
                if(extArray.includes(acceptedFiles[i].name.split(".").pop().toLowerCase())) {
                    if(acceptedFiles[i].size / Math.pow(2048,2) < 5) {
                      if(tempFile.length < 5) {
                        tempFile.push(acceptedFiles[i])
                      } else {
                        alert("I can accept only 5 files at a time.")
                        break
                      }
                    } else {
                      alert("File size is too big")
                    }
                }
                else {
                  setShowMsg(true)
                }
              }
            }
        props.handleFiles(tempFile)
          setFiles(
            tempFile.map((file: any) => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }))
          )
        }
      })
  
    const handleClick = (reomoveIndex) => {
        let deletedFiles =  tempFile.filter((value, index) => {
            return index != reomoveIndex
        })
        props.handleFiles(deletedFiles)
        setTempFile(deletedFiles)
        setFiles(deletedFiles)
    }
  
    const showMessage = () => {
      if(showMsg) {
        alert("*Files with only pdf, jpeg, jpg, png, doc, xlsx, xls, docx extensions are allowed.")
        setShowMsg(false)
        return (<></>)
      }
    }
       const attachmentFile = () => { 
      let attachmentData = files
      if(attachmentData && attachmentData.length > 0){
        return (
          <div>
            {
              attachmentData &&
              attachmentData.map((file:any,index:any)=>{
                let extension = file?.name.split(".").pop();
                switch(extension){
                  case 'pdf':
                    return (
                      <div style = {{paddingTop: "10px", width:"100vw"}}>
                        <Attachment
                            icon={<FilesPdfColoredIcon />}
                            header={file?.name}
                            actionable
                            action={{
                              icon: <CloseIcon />,
                              onClick: () => handleClick(index),
                              title: 'Close',
                            }}
                          />
                      </div>
                    );  
                    case 'ppt' || 'pptx':
                      return (
                        <div style = {{paddingTop: "10px", width:"100vw"}}>
                          <Attachment
                              icon={<PowerPointColorIcon />}
                              header={file?.name}
                              actionable
                              action={{
                                icon: <CloseIcon />,
                                onClick: () => handleClick(index),
                                title: 'Close',
                              }}
                            />
                        </div>
                      ); 
                    case 'jpg' || 'jpeg' || 'png':
                      return (
                          <div style = {{paddingTop: "10px" , width:"100vw"}}>
                            <Attachment
                                icon={<FilesImageIcon />}
                                header={file?.name}
                                actionable
                                action={{
                                  icon: <CloseIcon />,
                                  onClick: () => handleClick(index),
                                  title: 'Close',
                                }}
                              />
                          </div>
                        ); 
                    case 'xlsx' || 'xls':
                      return (
                          <div style = {{paddingTop: "10px", width:"100vw"}}>
                            <Attachment
                                icon={<ExcelColorIcon />}
                                header={file?.name}
                                actionable
                                action={{
                                  icon: <CloseIcon />,
                                  onClick: () => handleClick(index),
                                  title: 'Close',
                                }}
                              />
                          </div>
                        ); 
                    case 'docx' || 'doc':
                      return (
                          <div style = {{paddingTop: "10px", width:"100vw"}}>
                            <Attachment
                                icon={<WordColorIcon />}
                                header={file?.name}
                                actionable
                                action={{
                                  icon: <CloseIcon />,
                                  onClick: () => handleClick(index),
                                  title: 'Close',
                                }}
                              />
                          </div>
                        ); 
                }
              })
            }
          </div>
        )
      }
    } 
  return (
    <div>
      <div style={{ paddingTop: "10px" }}>{attachmentFile()}</div>
      <div {...getRootProps()}>
      <input {...getInputProps()} />
        <p className="" style={{color:"blue",cursor: "pointer"}}><PaperclipIcon/>{" Attach"}</p>
      </div>
      <div>
          {showMessage()} 
      </div> 
    </div>
  );
  }

export default Attachments
import React, {useState, useEffect,useRef} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import BottomNavigation from '@mui/material/BottomNavigation';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterScreen } from '../Authentication/Authentication';

import Pagination from '@mui/material/Pagination';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Questionnaire from '../Question/Question';
import UserNotification from '../UserNotification/UserNotification';
import TestNotification from '../TestNotification/TestNotification';
import TestDataEntry from '../TestDataEntry/TestDataEntry';
import GuestMenu from '../Menus/GuestMenu';
import { CardActions } from '@mui/material';
import './UserWindow.css'
import CostumizedIcon from '../CostumizedIcon/CostumizedIcon';
export const blankUser = {"name": "", "role": "",
"sex": "", "age": -1,"id": -1};

export default function UserWindow(props) { 
    const webSocket = useRef(null)
    const [userDetails,setUserDetails] = useState(blankUser)
    const [items,setItems] = useState([]);
    const [currentComponent,setCurrentComponent] = useState(0)
    useEffect(() => {
        webSocket.current = new W3CWebSocket('ws://127.0.0.1:7890');
        webSocket.current.onopen = () => console.log("ws opened");
        webSocket.current.onclose = () => reconnect()
        webSocket.current.onmessage = (message)=>handle_receive(JSON.parse(message.data))
          }, []);

      const reconnect = () =>{
        webSocket.current = new W3CWebSocket('ws://127.0.0.1:7890');
        webSocket.current.onopen = () => {
          if(isAuthenticated())
          webSocket.send({"type": "sign in","workflow" : props.workflow_id ,"id":userDetails["id"]
        });
        }
        webSocket.current.onclose = () => reconnect()
        webSocket.current.onmessage = (message)=>handle_receive(JSON.parse(message.data))
      }
    useEffect(()=>{
      console.log("useeffect items change")
      if (items.length >0)
      {
        if(currentComponent<=0 || currentComponent > items.length)
        {
          setCurrentComponent(1)
        }
      }
      else 
      {
        setCurrentComponent(0)
      }
    },[items])

    const handlePaginationChange = (event,value) => {
      setCurrentComponent(value)
    }
    const sendLogin  = (loginDetails) =>
    {
      console.log("UserWindow::sendLogin ~~ loginDetails: " + JSON.stringify(loginDetails))

      var login_request = {...loginDetails}
      login_request["type"] = "sign in"
      login_request["workflow"] = props.workflow_id  
      webSocket.current.send(JSON.stringify(login_request))
      setUserDetails((prev)=>(loginDetails))
    }
    const sendRegister  = (registerDetails) =>
    {
      console.log("UserWindow::sendRegister ~~ registerDetails: " + JSON.stringify(registerDetails))

      var register_request = {...registerDetails}
      register_request["type"] = "register"
      register_request["workflow"] = props.workflow_id  
      webSocket.current.send(JSON.stringify(register_request))
      setUserDetails((prev)=>(registerDetails))
    }
    const styles = {
         position: 'relative',
      
      };
    const sendData = (object_to_send) =>{
      if(!("id" in object_to_send)){
        object_to_send.id = userDetails.id   
      }
      object_to_send.workflow_id = props.workflow_id     
        dismiss_current()
        webSocket.current.send(JSON.stringify(object_to_send))
      }
    const dismiss_current = ()=>
    {
      let newArr = [...items];
      newArr.splice(currentComponent-1,1)
      setItems(newArr)

    }
    const isUserLoginDetails =  (details) => false // !"type" in details
    const handle_receive = (itemReceived) => {

      console.log("UserWindow::addItem ~ " + JSON.stringify(itemReceived))
      if (isUserLoginDetails(itemReceived)){
        setUserDetails(itemReceived)
      }
      else if (isComponent(itemReceived)){
          setItems((prevState) =>([...prevState,itemReceived]))
        }
      }  

      const getComponent = (itemToAdd) => {
        // return (<TestNotification test={1}/>)
        switch(itemToAdd["type"]) {
          case "questionnaire":
            return (<Questionnaire questionnaire = {itemToAdd} send ={sendData}/>)
            case "notification":
            return (<UserNotification notification = {itemToAdd["text"]} dismiss = {dismiss_current}/>)
            case "test":
              return (<TestNotification test_notification = {itemToAdd} dismiss = {dismiss_current}/>)
            case "test data entry":
              return (<TestDataEntry test_data_entry = {itemToAdd} send ={sendData}/>)
          default:
            console.log("User::getComponent::default block ~ "  +JSON.stringify(itemToAdd))
            // code block
        } 
        // <TestQuestionnaire/>  //change to switch case, and parse json accordingly
    
      }
    
       const isComponent = (message) => {
        const valid_types = ["questionnaire","notification","test data entry","test"]  
        
    
          return valid_types.includes(message["type"])
      }

      const handle_delete = ()=>{
        webSocket.current.close()
        props.delete(props.id)
      }
      const handle_login = () =>{

      }
      const handle_logout = ()=>{

      }
      const isAuthenticated = () =>userDetails != blankUser
return (
    <div>
      
    <Card sx={{ maxWidth: 345 , minHeight:300, maxHeight:300 }} >
   
      <CardHeader
        avatar={ // TODO: Change according to userDetails.role
          <CostumizedIcon sex={userDetails["sex"]} role={userDetails["role"]}/>
            
        }
        
        action={
          <GuestMenu/>
        }
        title={userDetails.name !="" && userDetails.role!=""?"name: " + userDetails.name + ", role: " + userDetails.role : ""}
        subheader={props.role}
      />
  


{/* Same as */}
      <CardContent style={ {scrollBehavior: "smooth", overflowY: "auto", maxHeight:210}} >
        
        <div >
        <ToastContainer style={{...styles,width:"86%", paddingBottom:"5px"}}
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover={false}
  containerId={props.id}
  enableMultiContainer
  limit ={1}
  
/>
        {isAuthenticated()?  
        <div>
        {currentComponent>0 && currentComponent -1 <items.length? getComponent(items[currentComponent-1]): undefined}


   </div>:
        <div> 
 
        <RegisterScreen containerId={props.id} sendRegister={sendRegister}/>
          </div>
    }
                                 
       
      </div>


  
    
      </CardContent>

    </Card>
    {items.length>0? <Pagination   style={{position: 'relative',bottom:'30px', width:"50%"}} count={items.length} page={currentComponent} onChange={handlePaginationChange} size="small"/>:<></>}

    </div>
)
}

//Name:-Sudip Nayek,CSE 4th Yr,Sec-A,u.roll:-10900117027,classroll:-12
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "./info.css";
let Info=()=>{


    let [user, setUser] = useState({
        name:"",email:"",mobile:"",gender:"",registrationno:"",universityroll:"",avgCGPA:""
        
    });

    let name, value;

    let handleInput = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    var userData = async (e) => {
        e.preventDefault();
        let {name,email,mobile,gender,registrationno,universityroll,avgCGPA} = user;

        let res = await fetch("http://localhost:3001/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,mobile,gender,registrationno,universityroll,avgCGPA
            })
        });
 
        let newdata = await res.json();
       
        
        if (newdata.status === 402 || !newdata) {
            window.alert("Registration Unsucessful");
        } else {  
            if(newdata){
                
            }
            window.alert("Registration Sucessful");
        }
   }
    return (
        <div className="col-md-6"  >
       
       <div style={{ 
  backgroundImage: `url(${process.env.PUBLIC_URL + '/im.jpg'})`,
  
  width:'100%' 
}}>     </div>

            <h2>Student Info</h2>
            <div>
                <form method="POST">
                <label>Name:</label>
                <input type="text" placeholder="Enter name" name="name" value={user.name} onChange={handleInput} /><br /><br />
                Email:<input type="text" placeholder="Enter email" name="email" value={user.email} onChange={handleInput} /><br /><br />
                Mobile:<input type="text" placeholder="Enter mobile no" name="mobile" value={user.mobile} onChange={handleInput} /><br /><br />
                    Gender:<input type="text" placeholder="Enter gender" name="gender" value={user.gender} onChange={handleInput} /><br /><br />
                    Reg.no:<input type="number" placeholder="Enter registration no" name="registrationno" value={user.registrationno} onChange={handleInput} /><br /><br />
                    Uni.roll:<input type="number" placeholder="Enter roll" name="universityroll" value={user.universityroll} onChange={handleInput} /><br/>
                    <br/>Avg.CGPA:<input type="number" placeholder="Enter cgpa" name="avgCGPA" value={user.avgCGPA} onChange={handleInput} /><br /><br />
                    <br /><br />

                    <Button variant="primary" type="submit" onClick={userData}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}


export default Info;
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import NavScrollExample from "../Header";

const AddRecord = () => {
    let {authTokens} = useContext(AuthContext)
    let{user} = useContext(AuthContext)
    let [record, setRecord] = useState({
        username: user.user_id,
        opening : "",
        closing : "",
        closing_money : "",
        known_gap : "",
        justify_gap : "",
        checkout : "",
        software : 0,
        chifa : 0,
    })
    useEffect(()=>{
        
        AddRecord()
        
    },[])



    let handleChange = (e) =>{
        const {name, value} = e.target
        
        
        setRecord((prev) =>{
            return {...prev, [name]: value}
        })
        
        
    }
    
    const navigate = useNavigate()
    let AddRecord = async (e) =>{
        e.preventDefault()
        

        record.software = parseFloat(record.software)
        record.checkout = (parseFloat(record.closing) + parseFloat(record.closing_money)) - (parseFloat(record.opening) + parseFloat(record.known_gap))
        
        
        await fetch(`/add_data`,
        {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(record)
            
        } 
        
        )
        
        navigate('/all')
    }


  return (
    
    
    <div className='form-body'>
      <h1 className='page-header'>Ajouter une recette</h1>
      <form  method="POST" id="form-1">
                    <input type="hidden" id="Asgho" />
                    <div>
                        <label >Utilisateur</label>
                        <input type="text" value={user.username}  className="form-control w-50  m-2" name="username" id="username"  onChange={handleChange} readOnly />
                    </div>
                    <div>
                        <label >Ouverture</label>
                        <input type="number"   className="form-control w-50  m-2" name="opening" id="op"  onChange={handleChange} />
                    </div>
                    <div>
                        <label>Cloture</label>
                        <input type="number" value={record?.closing} className="form-control w-50 m-2" name="closing" id="clo" onChange={handleChange}/>
                    </div>
                    
                    <div>
                        <label>Recette</label>
                        <input type="number" value={record?.closing_money} className="form-control w-50 m-2" name="closing_money" id="clom" onChange={handleChange} />
                    </div>
                    <div>
                        <label>Ecart</label>
                        <input type="number" value={record?.known_gap} className="form-control m-2 w-50" name="known_gap" id="known-gap" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Details</label>
                    <input type="text" value={record?.justify_gap} className="form-control m-2 w-50" name="justify_gap" id="justify" onChange={handleChange}/>
                    </div>
                    
                    <div>
                        <label>Logiciel</label>
                        <input type="number" value={record?.software} className="form-control m-2 w-50" name="software" id="soft" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Chifa</label>
                        <input type="number" value={record?.chifa} className="form-control m-2 w-50" name="chifa" id="chifa" onChange={handleChange}/>
                    </div>
                    <div className='btns'>
                        <input type="submit" onClick={ AddRecord} value="Mettre à jour" className="btn btn-success" id="save" />
                        
                    </div>
                </form>
    </div>
    
  )
}

export default AddRecord

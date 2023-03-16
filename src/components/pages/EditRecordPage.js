import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import NavScrollExample from "../Header";

const EditRecordPage = () => {
    let {authTokens} = useContext(AuthContext)
    let recordId = useParams().id
    let [record, setRecord] = useState({
        opening : '',
        closing : '',
        closing_money : '',
        known_gap : '',
        justify_gap : '',
        checkout : '',
        software : '',
        chifa : '',
    })
    useEffect(()=>{
        getRecord()
    },[recordId])





    let getRecord = async ()=>{
        
        let response = await fetch(`/all/${recordId}`,
        {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setRecord(data)
        

    }


    let handleChange = (e) =>{
        const {name, value} = e.target
        setRecord((prev) =>{
            return {...prev, [name]: value}
        })
    }
    
    const navigate = useNavigate()
    let updateRecord = async (e)=>{
        e.preventDefault()
        record.checkout = (parseFloat(record.closing) + parseFloat(record.closing_money)) - (parseFloat(record.opening) + parseFloat(record.known_gap))
        await fetch(`/all/${recordId}`,
        {
            method: 'PUT',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer  ' + String(authTokens.access)
            },
            body: JSON.stringify(record)
            
        } 
           
        ) 
        console.log('done')
        
        navigate('/all')
    }

    let DeleteRecord =  async (e) =>{
        e.preventDefault()
        
        await fetch(`/all/${recordId}`,
        {
            method: 'DELETE',
            headers:{
                
                'Authorization' : 'Bearer  ' + String(authTokens.access)
            }
        } 
        )
        navigate('/all')
    }
  return (
 
    <div className='form-body'>
      <h3 className='page-header'>La Recette de {record?.username} de {record?.creation_date}</h3>
      <form  method="POST" id="form-1">
                    <input type="hidden" id="Asgho" />
                    <div>
                        <label >Ouverture</label>
                        <input type="number" value={record?.opening} className="form-control w-50  m-2" name="opening" id="op"  onChange={handleChange}/>
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
                        <label>Caisse</label>
                        <input type="number" value={record?.checkout} className="form-control m-2 w-50" name="checkout" id="ch" readOnly onChange={handleChange}/>
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
                        <input type="submit" onClick={updateRecord} value="Mettre à jour" className="btn btn-success" id="save" />
                        <input type="submit" onClick={DeleteRecord} value="Retirer" className="btn btn-danger" id="delete" />
                    </div>
                </form>
    </div>
    
  )
}

export default EditRecordPage

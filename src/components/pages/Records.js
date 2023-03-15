import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Record from '../Record'

const Records = () => {

    let [records, setRecords] = useState([])
    let {authTokens} = useContext(AuthContext)
    
    useEffect(()=>{
        getRecords()
    },[])

    let getRecords  = async () => {
        let response = await fetch('all/',
        {method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer  ' + String(authTokens.access)
        }

        }) 
        let data = await response.json()
        setRecords(data)
        
    
    }
  return (
    
    <div>
      
      <div className='container'>
        <h1 className='page-header'> Journal De Caisse</h1>
      <table className="table table-striped">
            <thead className="table-dark ">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Utilisateur</th>
                  <th scope="col">Ouverture</th>
                  <th scope="col">Cloture</th>
                  <th scope="col">Recette</th>
                  <th scope="col">Ecart</th>
                  <th scope="col">Details</th>
                  <th scope="col">Réel</th>
                  <th scope="col">Logiciel</th>
                  <th scope="col">Chifa</th>
                  <th scope="col">Ec.Calc</th>
                  
                </tr>
              </thead>
              <tbody id="tbody">
                {records.map((record)=>(
            
      <Record key={record.id} record = {record}/>
            
            
        ))}
              </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default Records

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'
 

const Record = ({record}) => {
    let {user}  = useContext(AuthContext)
  return (
    
                  
                    <tr id={record.id}  className="trs">
                        
                          <td><Link  to={`/all/${record.id}`}>{record.creation_date} </Link> </td>
                        
                        <td>{user.username} </td>
                        <td>{record.opening} </td>
                        <td>{record.closing} </td>
                        <td>{record.closing_money} </td>
                        <td>{record.known_gap} </td>
                        <td>{record.justify_gap} </td>
                        <td>{record.checkout} </td>
                        <td >{record.software} </td>
                        <td>{record.chifa} </td>
                        <td>{record.gap} </td>
                        
                    </tr>
                  
            
        )}
              


export default Record

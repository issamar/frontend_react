import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {user,loginUser} = useContext(AuthContext)
    if(!user){
      return (
        <div>
          <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" >
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">
              <form onSubmit={loginUser}>
              <h2 className="fw-bold mb-2 text-uppercase">Accédez</h2>
              <p className="text-white-50 mb-5">S'il vous plaiez saisissez vos cordonnés </p>

              <div className="form-outline form-white mb-4">

                <label className="form-label" htmlFor="typeEmailX">Nom d'Utilisateur</label>
                <input type="text" id="typeEmailX" className="form-control form-control-lg" name='username' />
                
              </div>

              <div className="form-outline form-white mb-4">
                <label className="form-label" htmlFor="typePasswordX">Mot de Passe</label>
                <input type="password" id="typePasswordX" className="form-control form-control-lg" name='password' />
                
              </div>

              

              <button className="btn btn-outline-light btn-lg px-5" type="submit">Accédez</button>

              </form>

            </div>



          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
      )
    }else{
      return <Navigate to='/all'/>
    }
  
}

export default LoginPage

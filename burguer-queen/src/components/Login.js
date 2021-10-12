import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import '../style/Login.css';
import logo from '../media/logo1.svg';
import { signIn } from '../services/fetch';

const cookies = new Cookies();


// class Login extends Component {
//   state = {
//     form: {
//       username: '',
//       password: '',
//     },
//     messages: {
//       emailMsg: '',
//       passwordMsg: '',
//     }
//   };
//   goEmail = () => {
//     const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     if (reg.test(this.state.form.username) === false) {
//       this.setState({
//         messages: {
//           emailMsg: 'La estructura es example@correo',
//           passwordMsg: '',
//         }
//       });
//     } else {
//       this.setState({
//         messages: {
//           emailMsg: '',
//           passwordMsg: '',
//         }
//       });
//     }
//   }
//   goPassword = () => {
//     const reg =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
//     if (reg.test(this.state.form.password) === false) {
//       this.setState({
//         messages: {
//           emailMsg: '',
//           passwordMsg: 'La contraseña debe contener mayusculas, numeros y caracteres especiales',
//         }
//       });
//     } else {
//       this.setState({
//         messages: {
//           emailMsg: '',
//           passwordMsg: '',
//         }
//       });
//     }
//   }

//   handleChange = async (e) => {
//     await this.setState({
//       form: {
//         ...this.state.form,
//         [e.target.name]: e.target.value
//       }
//     });
//   };

//   signIn = () => {

//     axios.post(`${url}auth`, { email: this.state.form.username, password: this.state.form.password })
//       .then((res) => res.data)
//       .then((res) => {
//         if (res.token) {
//           cookies.set('token', res.token, { path: "/" });
//         }
//         window.location.href = "./admin";
//       })
//       .catch((rej) => console.log('error aquí', rej.message))
//   };

//   componentDidMount() {
//     if (cookies.get('token')) {
//       console.log(cookies.get('token'));
//       window.location.href = "./admin";
//     }
//   }

//   render() {
//     return (
//       <div className='principalCnt'>
//         <div className='secondCnt'>
//           <div className='form' >
//             <label> Usuario: </label>
//             <br />
//             <input
//               type='text' className='form-control' name='username' onChange={this.handleChange} onKeyUp={this.goEmail} />
//             <br />
//             <p className='goEmail'>{this.state.messages.emailMsg}</p>
//             <br />
//             <label>Contraseña: </label>
//             <br />
//             <input
//               type='password' className='form-control' name='password' onChange={this.handleChange} onKeyUp={this.goPassword}/>
//             <br />
//             <p className='goPassword'>{this.state.messages.passwordMsg}</p>
//             <br />
//             <button className='btn btn-login' onClick={() => this.signIn()}>Iniciar Sesion </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

const Login = ({setLoading, setError}) => {
    const initialForm = {
        email: '',
        password: ''
    };
    const [form, setForm] = useState(initialForm);
    const [messages, setMessages] = useState( {
      emailMsg: '',
      passwordMsg: '',
    });
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!form.email || !form.password) return setError('No ingresó correo o contraseña');
        return await signIn( form, setLoading, setError, setToken);
    };
    
    useEffect(() => {
        if(cookies.get('token')){
            console.log(cookies.get('token'));
            window.location.href="./admin";
        }
    }, []); 
  const goEmail = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.form.username) === false) {
      setMessages({
          emailMsg: 'La estructura es example@correo',
          passwordMsg: '',
        })
//       this.setState({
//         messages: {
//           emailMsg: 'La estructura es example@correo',
//           passwordMsg: '',
//         }
//       });
    } else {
      setMessages({
          emailMsg: '',
          passwordMsg: '',
        });
      
//       this.setState({
//         messages: {
//           emailMsg: '',
//           passwordMsg: '',
//         }
//       });
    }
  }
  const goPassword = () => {
    const reg =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (reg.test(this.state.form.password) === false) {
      setMessages({
          emailMsg: '',
          passwordMsg: 'La contraseña debe contener mayusculas, numeros y caracteres especiales',
        });
    
//       this.setState({
//         messages: {
//           emailMsg: '',
//           passwordMsg: 'La contraseña debe contener mayusculas, numeros y caracteres especiales',
//         }
//       });
    } else {
      setMessages({
          emailMsg: '',
          passwordMsg: '',
        });
//       this.setState({
//         messages: {
//           emailMsg: '',
//           passwordMsg: '',
//         }
//       });
    }
  }

        return (
            <div className='container'>
                <div className='header'>
                    <div className='logo'>
                        <img src={logo} alt='Logo'/>
                    </div>
                    <div className='title'>Iniciar Sesión</div>
                </div>
                <div className='formContainer'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='form-section'>
                        <label className='form-label'> Correo: </label>
                        <input 
                        type='text' className='form-input' name='email' onChange={handleChange} value={form.email} onKeyUp={()=>goEmail()}/>
                        <p className='goEmail'>{messages.emailMsg}</p>
                        </div>
                        <div className='form-section'>
                        <label className='form-label'>Contraseña: </label>
                        <input 
                        type='password' className='form-input' name='password' onChange={handleChange} onKeyUp={()=>goPassword()}/>
                        <p className='goPassword'>{messages.passwordMsg}</p>
                        </div>

                        <button className='formButton' type='submit'>Iniciar Sesion </button>
                    </form>
                </div>
            </div>
        );
}

export default Login;
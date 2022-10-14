import axios from "axios"
import jwt_decode from "jwt-decode";



const registration = (name, password, setNameError, setPasswordError, e) => {


}

const login = (name, password, setName, setPassword, setNameError, setPasswordError, e) => {
    axios.post('http://localhost:8000/vouche/users/registration', { name, password })
        .then(res => {
            if (res.data.error) {
                console.log(res.data.error)
                if (res.data.error.password && res.data.error.name) {
                    setNameError(res.data.error.name)
                    setPasswordError(res.data.error.password)
                }

                if (res.data.error.password) {
                    setPasswordError(res.data.error.password)
                }

                if (res.data.error.name) {
                    setNameError(res.data.error.name)
                }

            }
            if (res.data.token) {
                localStorage.setItem("token", JSON.stringify(res.data.token))
                setPassword('')
                setName('')
                setPasswordError('')
                setNameError('')
                e.target.reset()
            }

            if (res.data.message === "Name Already Exist") {

                const token = localStorage.getItem("token")
                const decoded = jwt_decode(token);

                if (decoded.name === name) {
                    axios.post('http://localhost:8000/vouche/users/login', { name, password })
                        .then(res => {
                            console.log(res)

                            if (res.data.message === "Password Didn't Match") {
                                setPasswordError(res.data.message)
                            }
                            setNameError('')
                            e.target.reset()
                        })


                }

            }

        })
}


export {
    login
}
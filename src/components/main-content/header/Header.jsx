import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVault } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@material-tailwind/react"
import { auth } from "../../../firebase/firebase"
import { useState, useEffect } from "react"
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate();
    function handleLogout() {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Logout error:', error.message);
            });
    }
    
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <header className="bg-off_black h-[90px] text-white flex justify-between sm:px-12 px-6 py-4">
            <h1 className="flex items-center space-x-2">
                <span className="text-2xl">LinkVault</span>
                <FontAwesomeIcon className="text-3xl text-green" icon={faVault} />
            </h1>
            {user &&
                <Button className="bg-grey text-sm h-[50px] hover:bg-green hover:text-dark_grey hover:tracking-widest" aria-label="Logout" onClick={handleLogout}>
                    Logout
                </Button>
            }
        </header>
    )
}

export default Header
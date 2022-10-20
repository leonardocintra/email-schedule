import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useNavMobileContext } from "../contexts/NavMobileContext";
import { BarsIcon } from "../Icon";
import { NavLogo } from "./NavLogo";
import { NavMobileItem } from "./NavMobileItem";

export function Nav() {

    const { isVisible, setIsVisible } = useNavMobileContext();

    return (
        <nav className="w-full h-20 bg-gray-50 border-b border-green-500">
            <div className="w-full h-full max-w-7xl m-auto flex items-center justify-between px-4">
                <NavLogo></NavLogo>

                <div className="hidden lg:flex  items-center gap-4">
                    <Link to="/dashboard">
                        <Button>Dashboard</Button>
                    </Link>
                    <Link to="/contatos">
                        <Button>Contatos</Button>
                    </Link>
                    <Link to="/emails">
                        <Button>E-mails</Button>
                    </Link>
                    <Link to="/escrever-agora">
                        <Button variant="primary">Escrever email</Button>
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <Button onClick={() => setIsVisible((prev) => !prev)}>
                        {isVisible ? (
                            <span className="font-bold text-2xl">X</span>
                        ) : (
                            <BarsIcon />
                        )}

                    </Button>
                </div>
            </div>
            {isVisible && (
                <div className="w-full h-[calc(100vh-81px)] fixed top-20 left-0 bg-white">
                    <div className="flex flex-col items-stretch justify-center">
                        <NavMobileItem to="/dashboard"> Dashboard </NavMobileItem>
                        <NavMobileItem to="/contatos"> Contatos</NavMobileItem>
                        <NavMobileItem to="/emails"> E-mails</NavMobileItem>
                        <NavMobileItem to="/escrever-agora" variant="primary"> Escrever email</NavMobileItem>
                    </div>
                </div>
            )}
        </nav>
    )
}
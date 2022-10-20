import { Link } from "react-router-dom";
import { Button } from "../Button";
import { BarsIcon } from "../Icon";
import { NavLogo } from "./NavLogo";
import { NavMobileItem } from "./NavMobileItem";

export function Nav() {
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
                    <Button onClick={() => console.log('Criquei')}>
                        {true ? ( 
                            <BarsIcon />
                        ): (
                            <span className="font-bold text-2xl">X</span>
                        )}

                    </Button>
                </div>
            </div>
            <div className="w-full h-[calc(100vh-81px)] fixed top-20 left-0 bg-white">
                <div className="flex flex-col items-stretch justify-center">

                    <Link to="/dashboard">
                        <NavMobileItem> Dashboard </NavMobileItem>
                    </Link>
                    <Link to="/contatos">
                        <NavMobileItem> Contatos</NavMobileItem>
                    </Link>
                    <Link to="/emails">
                        <NavMobileItem> E-mails</NavMobileItem>
                    </Link>

                    <Link to="/escrever-agora">
                        <NavMobileItem variant="primary"> Escrever email</NavMobileItem>
                    </Link>

                </div>
            </div>
        </nav>
    )
}
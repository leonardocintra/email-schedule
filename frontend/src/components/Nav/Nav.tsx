import { Link } from "react-router-dom";
import { Button } from "../Button";
import { NavLogo } from "./NavLogo";

export function Nav() {
    return (
        <nav className="w-full h-20 bg-gray-50 border-b border-green-500">
            <div className="w-full h-full max-w-7xl m-auto flex items-center justify-between">
                <NavLogo></NavLogo>

                <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button>Dashboard</Button>
                    </Link>
                    <Link to="/escrever-agora">
                        <Button variant="primary">Escrever algo</Button>
                    </Link>
                </div>

            </div>
        </nav>
    )
}
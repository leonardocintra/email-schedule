import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useNavMobileContext } from "../contexts/NavMobileContext";

type Props = {
    to: string;
    variant?: 'default' | 'primary';
    children: React.ReactNode;
}

export function NavMobileItem({ to, variant = 'default', children }: Props) {

    const navigate = useNavigate();
    const { setIsVisible } = useNavMobileContext();

    let bgColor = 'bg-white text-black hover:bg-gray-200 active:bg-gray-300 transition-all';
    if (variant === 'primary') {
        bgColor = 'bg-primary text-white hover:bg-primaryLight active:bg-primaryDark transition-all';
    }

    function handleButtonClick() {
        setIsVisible(false);
        navigate(to);
    }

    return (
        <button onClick={handleButtonClick} className={classNames("w-full p-4 border-b border-gray-300 flex items-start", bgColor)}>
            {children}
        </button>
    )

}
import classNames from "classnames";

type Props = {
    variant?: 'default' | 'primary';
    children: React.ReactNode;
}

export function NavMobileItem({ variant = 'default', children }: Props) {

    let bgColor = 'bg-white text-black hover:bg-gray-100 active:bg-gray-200 transition-all';
    if (variant === 'primary') {
        bgColor = 'bg-primary text-white hover:bg-primaryLight active:bg-primaryDark transition-all';
    }

    return (
        <div className={classNames("w-full p-4 border-b border-gray-300", bgColor)}>
            {children}
        </div>
    )

}
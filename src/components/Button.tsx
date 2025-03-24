interface ButtonProps {
    label: string;
    onClick: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    type?: "submit" | "button" | "reset" | undefined;
}

export default function Button({ label, onClick, type = "button" }: ButtonProps) {
    return (
        <button className="rounded-md px-4 py-2 bg-gray-900 text-white hover:bg-gray-800" onClick={onClick} type={type}>
            {label}
        </button>
    );
}

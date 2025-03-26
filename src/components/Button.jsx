export default function Button({ title, onClick }) {

    return <button onClick={onClick} className="bg-primary text-white text-sm font-semibold px-3 py-1.5 rounded-md">
        {title}
    </button>;
}
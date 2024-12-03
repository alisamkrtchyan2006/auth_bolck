export default function Profile() {


    return (
        <div className="flex flex-col items-center bg-gray-800 text-gray-100 p-6 rounded-lg shadow-2xl max-w-sm mx-auto">
            <img
                src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-02-512.png"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg mb-4"
            />
            <h1 className="text-2xl font-extrabold text-purple-400 mb-2">John Doe</h1>
            <p className="text-gray-300 text-center">
                Full-stack Developer passionate about building modern web applications and writing clean, maintainable code.
            </p>
        </div>
    );
}

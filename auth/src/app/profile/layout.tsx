import { redirect } from "next/navigation";
import { verifyUser } from "../_lib/actions";

interface IProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: IProps) {
    const verification = await verifyUser()
    if(!verification.user) {
        redirect("/login")
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col">

            <nav className="w-full bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">

                            <div className="text-2xl font-bold text-purple-400">
                                MyApp
                            </div>

                            <div className="ml-10 flex space-x-4">
                                <a
                                    href="#profile"
                                    className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profile
                                </a>
                                <a
                                    href="#settings"
                                    className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Settings
                                </a>
                                <a
                                    href="#photos"
                                    className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Photos
                                </a>
                                <a
                                    href="#posts"
                                    className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Posts
                                </a>
                                <a
                                    href="#more"
                                    className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    More
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <img
                                src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-02-512.png"
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-purple-500"
                            />
                            <span className="text-gray-300 text-sm">
                                Welcome, User!
                            </span>
                        </div>
                    </div>
                </div>
            </nav>


            <main className="flex-grow w-full max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-6">
                {children}
            </main>
        </div>
    );
}

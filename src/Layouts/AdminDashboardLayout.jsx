
import TopNavigation from "../Components/Navigation/NavigationTop"
import { useState } from 'react';


export default function AdminDashboardLayout({header, children}) {
    
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div>
            <div className="min-h-screen bg-gray-100 ">
            
                <TopNavigation />

                {header && (<header>
                    <div className="container mx-auto">
                        {header}
                    </div>
                </header>)}

                <main>
                    {children}
                </main>

            </div>
        </div>
    );
}




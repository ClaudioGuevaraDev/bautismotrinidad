import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function DashboardLayout({ children }: Props) {
  const { pathname } = useLocation();

  return (
    <div>
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/video"
                className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100  group ${
                  pathname === "/dashboard/video" && "bg-gray-100"
                }`}
              >
                <span className="ml-3">Editar Video</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="p-4 md:ml-64 h-auto pt-6">{children}</main>
    </div>
  );
}

export default DashboardLayout;

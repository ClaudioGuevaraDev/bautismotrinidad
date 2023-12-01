import { Tab } from "@headlessui/react";
import { useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

const sections = ["Mensajes", "Imágenes", "Configuraciones"];

function VideoDashboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold whitespace-nowrap">Editar Video</h1>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 flex">
            {sections.map((section, index) => (
              <Tab
                key={section}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-fuchsia-400 focus:outline-none focus:ring-2 ${
                  selectedIndex === index
                    ? "bg-white text-gray-700 shadow"
                    : "text-gray-900 hover:bg-white/[0.12]"
                }`}
              >
                {section}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>Mensajes</Tab.Panel>
            <Tab.Panel>Imágenes</Tab.Panel>
            <Tab.Panel>Configuraciones</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardLayout>
  );
}

export default VideoDashboard;

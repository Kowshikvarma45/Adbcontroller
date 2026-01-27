import axios from "axios";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("devices");
  const [ip, setIp] = useState("");
  const [adbId, setAdbId] = useState("");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("wpa2");
  const [response, setResponse] = useState(null);

  const backendUrl = "http://localhost:8000/api";

  const callApi = async (url:any, body:any) => {
    try {
      const res = await axios.post(`${backendUrl}${url}`,{
        body: body,
      })
      if (res.status == 200) {
        const data = await res.data;
        setResponse(data);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
      alert("Error occurred - check console and response below");
    }
  };

  const tabs = [
    { id: "devices", label: "ADB Devices" },
    { id: "wifi", label: "WiFi Control" },
    { id: "scan", label: "Scan Networks" },
    { id: "connect", label: "Connect WiFi" },
    { id: "app", label: "App Control" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6">
            <h1 className="text-2xl font-bold text-white">
              LANforge ADB Controller
            </h1>
            <p className="text-blue-100 mt-1">
              Manage Android devices via ADB
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Tab 1: Get ADB Devices */}
            {activeTab === "devices" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Get ADB Devices
                </h2>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LANforge IP (e.g., 192.168.204.75)"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ADB ID (serial)"
                  value={adbId}
                  onChange={(e) => setAdbId(e.target.value)}
                />
                {/* <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resource ID (e.g., 3)"
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                /> */}
                <button
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => callApi("/getadbdevices/", { ip,adbId })}
                >
                  Get ADB Devices
                </button>
              </div>
            )}

            {/* Tab 2: WiFi Control (Enable/Disable) */}
            {activeTab === "wifi" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  WiFi Control
                </h2>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LANforge IP (e.g., 192.168.204.75)"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ADB ID (serial)"
                  value={adbId}
                  onChange={(e) => setAdbId(e.target.value)}
                />
                {/* <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resource ID (e.g., 3)"
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                /> */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    onClick={() =>
                      callApi("/togglewifi/", {
                        ip,
                        type:"enable",
                        adb_id: adbId,
                      })
                    }
                  >
                    Enable WiFi
                  </button>
                  <button
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    onClick={() =>
                      callApi("/togglewifi/", {
                        ip,
                        type:"disable",
                        adb_id: adbId,
                      })
                    }
                  >
                    Disable WiFi
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Scan Available Networks */}
            {activeTab === "scan" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Scan Available Networks
                </h2>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LANforge IP (e.g., 192.168.204.75)"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ADB ID (serial)"
                  value={adbId}
                  onChange={(e) => setAdbId(e.target.value)}
                />
                {/* <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resource ID (e.g., 3)"
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                /> */}
                <button
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() =>
                    callApi("/scan/", {
                      ip,
                      adb_id: adbId,
                    })
                  }
                >
                  Scan for SSIDs
                </button>
              </div>
            )}

            {/* Tab 4: Connect to WiFi */}
            {activeTab === "connect" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Connect to WiFi Network
                </h2>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LANforge IP (e.g., 192.168.204.75)"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ADB ID (serial)"
                  value={adbId}
                  onChange={(e) => setAdbId(e.target.value)}
                />
                {/* <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resource ID (e.g., 3)"
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                /> */}
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SSID (Network Name)"
                  value={ssid}
                  onChange={(e) => setSsid(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={encryption}
                  onChange={(e) => setEncryption(e.target.value)}
                >
                  <option value="open">Open (No Password)</option>
                  <option value="wpa">WPA</option>
                  <option value="wpa2">WPA2</option>
                  <option value="wpa3">WPA3</option>
                </select>
                <button
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() =>
                    callApi("/connectwifi/", {
                      ip,
                      adb_id: adbId,
                      ssid,
                      password,
                      encryption,
                    })
                  }
                >
                  Connect to WiFi
                </button>
              </div>
            )}

            {/* Tab 5: App Control */}
            {activeTab === "app" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  App Control
                </h2>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LANforge IP (e.g., 192.168.204.75)"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
                 <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ADB ID (serial)"
                  value={adbId}
                  onChange={(e) => setAdbId(e.target.value)}
                />
                {/* <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resource ID (e.g., 3)"
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="App Package (e.g., com.android.chrome)"
                  value={appPackage}
                  onChange={(e) => setAppPackage(e.target.value)}
                />  */}
                <button
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                  onClick={() =>
                    callApi("/restartapp/", {
                      ip,
                      adb_id: adbId,
                    })
                  }
                >
                  Restart App
                </button>
              </div>
            )}
          </div>

          {/* Response Section */}
          {response && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Response:
                </h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-auto max-h-96 font-mono">
                  {JSON.stringify(response, null, 2)}
                </pre>
                <button
                  onClick={() => setResponse(null)}
                  className="mt-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear Response
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
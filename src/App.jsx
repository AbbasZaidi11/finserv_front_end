import { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
        throw new Error("Invalid JSON format.");
      }

      const res = await axios.post(
        "https://finserv-backend.onrender.com/bfhl",
        parsedJson
      );
      setResponse(res.data);
      setDropdownVisible(true);
    } catch (err) {
      console.log(err);
      setError(
        "Invalid JSON format. Please ensure your input is a valid JSON array."
      );
    }
  };

  const handleDropdownChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
        {selectedOptions.includes("Alphabets") && (
          <div className="mb-2">
            <strong className="text-gray-800">Alphabets:</strong>{" "}
            {JSON.stringify(response.alphabets)}
          </div>
        )}
        {selectedOptions.includes("Numbers") && (
          <div className="mb-2">
            <strong className="text-gray-800">Numbers:</strong>{" "}
            {JSON.stringify(response.numbers)}
          </div>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <div>
            <strong className="text-gray-800">
              Highest lowercase alphabet:
            </strong>{" "}
            {JSON.stringify(response.highest_lowercase_alphabet)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">INPUT JSON</h1>
      <textarea
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder="Enter JSON"
        className="w-full max-w-2xl h-36 p-4 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition"
      >
        Submit
      </button>

      {error && <p className="mt-6 text-red-600 font-medium">{error}</p>}

      {dropdownVisible && (
        <div className="mt-6">
          <label className="block text-blue-700 text-lg font-medium mb-2">
            Select options:
          </label>
          <select
            multiple
            className="w-full max-w-2xl p-3 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleDropdownChange}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
  );
};

export default App;

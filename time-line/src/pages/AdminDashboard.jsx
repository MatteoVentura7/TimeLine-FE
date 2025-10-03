import React from "react";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg">
        Benvenuto nella dashboard riservata agli amministratori.
      </p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Esegui Operazione Riservata
        </button>
      </div>
    </div>
  );
}

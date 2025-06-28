import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useChartData } from "../../utils/hooks/useChart";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const DashboardPage = () => {
  const { data, isLoading, isError, error } = useChartData();
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Memuat data dasbor...
      </div>
    );
  }
  if (isError) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        Terjadi kesalahan: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Tidak ada data untuk ditampilkan.
      </div>
    );
  }

  const { students = [], genderRatio = [], registrations = [] } = data;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Dashboard Akademik
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "30px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Tren Pendaftaran per Tahun</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                name="Pendaftar"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Mahasiswa per Fakultas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={students}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="faculty"
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Jumlah Mahasiswa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Rasio Gender Mahasiswa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderRatio}
                dataKey="count"
                nameKey="gender"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ gender, percent }) =>
                  `${gender} ${(percent * 100).toFixed(0)}%`
                }
              >
                {genderRatio.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

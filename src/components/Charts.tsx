"use client";

import type { LicenseTamBreakdown } from "@/types";
import { formatCurrency } from "@/lib/tam";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
  "#818cf8",
  "#4f46e5",
];

interface LicenseChartProps {
  data: LicenseTamBreakdown[];
}

export function LicensePieChart({ data }: LicenseChartProps) {
  const chartData = data.map((d) => ({
    name: d.name,
    value: d.annualRevenue,
    seats: d.seats,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
          }
          labelLine={false}
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => formatCurrency(Number(value))}
          contentStyle={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 8,
            color: "#fff",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function LicenseBarChart({ data }: LicenseChartProps) {
  const chartData = data.map((d) => ({
    name: d.name.replace("Teams ", ""),
    seats: d.seats,
    annual: d.annualRevenue,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
        <XAxis
          type="number"
          tickFormatter={(v) => formatCurrency(v, true)}
          stroke="#888"
          fontSize={12}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={90}
          stroke="#888"
          fontSize={12}
        />
        <Tooltip
          formatter={(value, name) => [
            name === "seats"
              ? Number(value).toLocaleString()
              : formatCurrency(Number(value)),
            name === "seats" ? "Seats" : "Annual Revenue",
          ]}
          contentStyle={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 8,
            color: "#fff",
          }}
        />
        <Bar dataKey="annual" fill="#6366f1" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface StateChartProps {
  data: { state: string; engineers: number; annualTam: number }[];
}

export function StateBarChart({ data }: StateChartProps) {
  const sorted = [...data].sort((a, b) => b.annualTam - a.annualTam);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={sorted}>
        <XAxis dataKey="state" stroke="#888" fontSize={12} />
        <YAxis
          tickFormatter={(v) => formatCurrency(v, true)}
          stroke="#888"
          fontSize={12}
        />
        <Tooltip
          formatter={(value, name) => [
            name === "engineers"
              ? Number(value).toLocaleString()
              : formatCurrency(Number(value)),
            name === "engineers" ? "Engineers" : "Annual TAM",
          ]}
          contentStyle={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 8,
            color: "#fff",
          }}
        />
        <Bar dataKey="annualTam" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface IndustryChartProps {
  data: { industry: string; engineers: number; annualTam: number }[];
}

export function IndustryChart({ data }: IndustryChartProps) {
  const sorted = [...data].sort((a, b) => b.annualTam - a.annualTam).slice(0, 8);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={sorted} layout="vertical" margin={{ left: 10 }}>
        <XAxis
          type="number"
          tickFormatter={(v) => formatCurrency(v, true)}
          stroke="#888"
          fontSize={11}
        />
        <YAxis
          type="category"
          dataKey="industry"
          width={100}
          stroke="#888"
          fontSize={11}
        />
        <Tooltip
          formatter={(value) => formatCurrency(Number(value))}
          contentStyle={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 8,
            color: "#fff",
          }}
        />
        <Bar dataKey="annualTam" fill="#a78bfa" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

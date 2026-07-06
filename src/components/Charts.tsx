"use client";

import type { LicenseTamBreakdown } from "@/types";
import { formatCurrency } from "@/lib/tam";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#818cf8", "#4f46e5"];

const tooltipStyle = {
  background: "#1a1a2e",
  border: "1px solid #333",
  borderRadius: 8,
  color: "#fff",
};

interface SkuComparisonChartProps {
  data: LicenseTamBreakdown[];
  metric?: "annual" | "monthly";
}

export function SkuComparisonChart({ data, metric = "annual" }: SkuComparisonChartProps) {
  const chartData = data.map((d) => ({
    name: d.name.replace("Teams ", ""),
    value: metric === "annual" ? d.annualRevenue : d.monthlyRevenue,
    seats: d.seats,
    unitPrice: d.unitPrice,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" stroke="#888" fontSize={11} interval={0} angle={-15} textAnchor="end" height={55} />
        <YAxis tickFormatter={(v) => formatCurrency(v, true)} stroke="#888" fontSize={11} />
        <Tooltip
          formatter={(value) => formatCurrency(Number(value))}
          labelFormatter={(label) => `${label} SKU`}
          contentStyle={tooltipStyle}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
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
        <YAxis tickFormatter={(v) => formatCurrency(v, true)} stroke="#888" fontSize={12} />
        <Tooltip
          formatter={(value, name) => [
            name === "engineers" ? Number(value).toLocaleString() : formatCurrency(Number(value)),
            name === "engineers" ? "Engineers" : "Annual TAM",
          ]}
          contentStyle={tooltipStyle}
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
        <XAxis type="number" tickFormatter={(v) => formatCurrency(v, true)} stroke="#888" fontSize={11} />
        <YAxis type="category" dataKey="industry" width={100} stroke="#888" fontSize={11} />
        <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={tooltipStyle} />
        <Bar dataKey="annualTam" fill="#a78bfa" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

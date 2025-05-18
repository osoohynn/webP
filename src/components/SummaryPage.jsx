import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Summary from "./Summary";

export default function SummaryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.data) return <Navigate to="/" replace />;

  const { data } = state;
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <Summary
      data={data}
      onReset={() => navigate("/")}
      />
    </div>
  );
}
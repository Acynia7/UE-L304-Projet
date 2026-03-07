import React from "react";

export default function StatCard({ title, value, unit, icon }) {
    return (
        <div className="stat-card">
            <div className="icon">{icon}</div>
            <div className="info">
                <div className="top">
                    <span className="value">{value}</span>
                    {unit && <span className="unit">{unit}</span>}
                </div>
                <span className="label">{title}</span>
            </div>
        </div>
    );
}

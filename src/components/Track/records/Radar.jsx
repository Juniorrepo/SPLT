// src/components/Track/records/Radar.jsx
import React from "react";
import Svg, { Line, Polygon, Circle, Text as SvgText } from "react-native-svg";

// very lightweight star/radar just for visuals
export default function Radar({ size = 220, labels = ["Arms","Back","Legs","Shoulders","Chest","Core"], value = [0.6,0.75,0.9,0.5,0.55,0.7] }) {
    const cx = size / 2, cy = size / 2, r = size * 0.36, spokes = labels.length;
    const toXY = (i, mult=1) => {
        const ang = (-Math.PI/2) + (i * 2*Math.PI / spokes);
        return [cx + Math.cos(ang) * r * mult, cy + Math.sin(ang) * r * mult];
    };
    const points = value.map((v,i)=>toXY(i,v).join(",")).join(" ");
    return (
        <Svg width={size} height={size}>
            {[0.33,0.66,1].map((m,idx)=>(
                <Polygon key={idx} points={Array.from({length:spokes},(_,i)=>toXY(i,m).join(",")).join(" ")} stroke="rgba(255,255,255,0.25)" strokeDasharray="4,6" fill="none" />
            ))}
            {Array.from({length:spokes},(_,i)=>(
                <Line key={i} x1={cx} y1={cy} x2={toXY(i,1)[0]} y2={toXY(i,1)[1]} stroke="rgba(255,255,255,0.25)" strokeDasharray="6,6" />
            ))}
            <Polygon points={points} fill="rgba(156,107,255,0.18)" stroke="#9C6BFF" />
            <Circle cx={cx} cy={cy} r={20} fill="rgba(255,255,255,0.06)" />
            {labels.map((lab,i)=>{
                const [x,y] = toXY(i,1.2);
                return <SvgText key={i} x={x} y={y} fill="#fff" fontSize="11" textAnchor="middle">{lab}</SvgText>
            })}
        </Svg>
    );
}

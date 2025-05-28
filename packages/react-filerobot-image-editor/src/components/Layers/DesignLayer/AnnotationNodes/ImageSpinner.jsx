import React, { useState, useEffect } from 'react';
import { Arc, Group } from 'react-konva';
import PropTypes from 'prop-types';

const KonvaSpinner = ({
  x = 100,
  y = 100,
  radius = 30,
  strokeWidth = 6,
  color = '#1d72b8',
  segmentAngle = 270,
  speed = 4, // degrees per frame
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animFrameId;
    const rotate = () => {
      setRotation((prev) => (prev + speed) % 360);
      animFrameId = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(animFrameId);
  }, [speed]);

  return (
    <Group x={x} y={y} rotation={rotation}>
      <Arc
        x={0}
        y={0}
        innerRadius={radius - strokeWidth}
        outerRadius={radius}
        angle={segmentAngle}
        stroke={color}
        strokeWidth={strokeWidth}
        lineCap="round"
      />
    </Group>
  );
};

export default KonvaSpinner;

KonvaSpinner.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  segmentAngle: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
};

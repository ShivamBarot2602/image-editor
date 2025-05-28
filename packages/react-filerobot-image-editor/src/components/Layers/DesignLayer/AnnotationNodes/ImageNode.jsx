/** External Dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

/** Internal Dependencies */
import loadImage from 'utils/loadImage';
import nodesCommonPropTypes from '../nodesCommonPropTypes';
import KonvaSpinner from './ImageSpinner';

const ImageNode = ({
  id,
  name,
  image,
  x,
  y,
  width,
  height,
  scaleX,
  scaleY,
  rotation,
  annotationEvents,
  stroke,
  strokeWidth,
  shadowOffsetX,
  shadowOffsetY,
  shadowBlur,
  shadowColor,
  shadowOpacity,
  opacity,
  ...otherProps
}) => {
  const [imgElement, setImgElement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (typeof image === 'string') {
      loadImage(image).then((loadedImage) => {
        if (isMounted) {
          setImgElement(loadedImage);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [image]);

  const isImgElement = image instanceof HTMLImageElement;
  const finalImg = isImgElement ? image : imgElement;

  const spinnerRadius = Math.max(10, Math.min(width, height) * 0.1);

  if (loading) {
    return (
      <KonvaSpinner
        x={x + width / 2}
        y={y + height / 2}
        radius={spinnerRadius}
        strokeWidth={spinnerRadius * 0.1}
        color="#555"
        speed={5}
      />
    );
  }

  if (!finalImg) return null;

  return (
    <Image
      id={id}
      name={name}
      rotation={rotation}
      scaleX={scaleX}
      scaleY={scaleY}
      stroke={stroke}
      strokeWidth={strokeWidth}
      shadowOffsetX={shadowOffsetX}
      shadowOffsetY={shadowOffsetY}
      shadowBlur={shadowBlur}
      shadowColor={shadowColor}
      shadowOpacity={shadowOpacity}
      image={finalImg}
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={opacity}
      {...otherProps}
      {...annotationEvents}
    />
  );
};

ImageNode.defaultProps = {
  ...nodesCommonPropTypes.defaults,
  width: 0,
  height: 0,
};

ImageNode.propTypes = {
  ...nodesCommonPropTypes.definitions,
  image: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    // PropTypes.instanceOf(HTMLVideoElement),
    PropTypes.instanceOf(ImageBitmap),
    PropTypes.string,
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  annotationEvents: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ImageNode;

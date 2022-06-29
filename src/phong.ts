import Vector from './vector';
import Intersection from './intersection';

/**
 * Calculate the colour of an object at the intersection point according to the Phong Lighting model.
 * @param color The colour of the intersected object
 * @param intersection The intersection information
 * @param lightPositions The light positions
 * @param shininess The shininess parameter of the Phong model
 * @param cameraPosition The position of the camera
 * @return The resulting colour
 */
export default function phong(
  color: Vector, intersection: Intersection,
  lightPositions: Array<Vector>, shininess: number,
  cameraPosition: Vector
): Vector {
  const lightColor = new Vector(0.8, 0.8, 0.8, 0);
  const kA = 0.8;
  const kD = 0.5;
  const kS = 0.5;

  // Ambient Lighting
  let phon_lighting = color.mul(kA);
  
  // Diffuse Lighting
  const n = intersection.normal;
  for (const lightPosition of lightPositions) {
    const s = lightPosition.sub(intersection.point).normalize();  // Spitze minus Fuß
    const i_s = lightColor;
    const i_d = i_s.mul(kD).mul(Math.max((s.dot(n) / s.length * n.length), 0));
    phon_lighting = phon_lighting.add(i_d);  //phong_lighting += i_d;
  }

  // Specular Lighting
  const k_s = kS;
  const k_e = shininess;
  const l = lightColor;
  const v = cameraPosition.sub(intersection.point).normalize();
  for (const lightPosition of lightPositions) { 
    const s = lightPosition.sub(intersection.point).normalize();  // Spitze minus Fuß
    const r = n.mul(2 * n.dot(s)).sub(s);
    const l_s = l.mul(k_s).mul(Math.pow(Math.max((r.dot(v) / r.length * v.length), 0), k_e));
    phon_lighting = phon_lighting.add(l_s);  //phong_lighting += l_s;
  }

  return phon_lighting;
}
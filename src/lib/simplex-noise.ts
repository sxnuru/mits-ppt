// A fast, elegant, self-contained 2D Simplex Noise implementation in TypeScript.
// Based on Stefan Gustavson's Java implementation, optimized for TypeScript.

export class SimplexNoise2D {
  private perm: Uint8Array;
  private permMod12: Uint8Array;

  constructor(seed = 0.5) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      p[i] = i;
    }
    // Shuffle using a deterministic seeded PRNG
    let s = seed;
    const rng = () => {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }

    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  // Skewing and unskewing factors for 2D
  private static F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  private static G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

  // Gradients for 2D
  private static grad3 = new Float32Array([
    1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0,
    -1,
  ]);

  public noise(xin: number, yin: number): number {
    let n0 = 0,
      n1 = 0,
      n2 = 0; // Noise contributions from the three corners

    // Skew the input space to determine which simplex cell we're in
    const s = (xin + yin) * SimplexNoise2D.F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);

    const t = (i + j) * SimplexNoise2D.G2;
    const X0 = i - t; // Unskew the cell origin back to (x,y) space
    const Y0 = j - t;
    const x0 = xin - X0; // The x,y distances from the cell origin
    const y0 = yin - Y0;

    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    let i1, j1; // Offsets for second corner of simplex in (i,j) coords
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    } // upper triangle, Lower triangle

    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where c = G2
    const x1 = x0 - i1 + SimplexNoise2D.G2; // Offsets for middle corner in (x,y) unskewed coords
    const y1 = y0 - j1 + SimplexNoise2D.G2;
    const x2 = x0 - 1.0 + 2.0 * SimplexNoise2D.G2; // Offsets for last corner in (x,y) unskewed coords
    const y2 = y0 - 1.0 + 2.0 * SimplexNoise2D.G2;

    // Work out the hashed gradient indices of the three simplex corners
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.permMod12[ii + this.perm[jj]];
    const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]];
    const gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]];

    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0.0;
    } else {
      t0 *= t0;
      n0 =
        t0 *
        t0 *
        (SimplexNoise2D.grad3[gi0 * 2] * x0 +
          SimplexNoise2D.grad3[gi0 * 2 + 1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0.0;
    } else {
      t1 *= t1;
      n1 =
        t1 *
        t1 *
        (SimplexNoise2D.grad3[gi1 * 2] * x1 +
          SimplexNoise2D.grad3[gi1 * 2 + 1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0.0;
    } else {
      t2 *= t2;
      n2 =
        t2 *
        t2 *
        (SimplexNoise2D.grad3[gi2 * 2] * x2 +
          SimplexNoise2D.grad3[gi2 * 2 + 1] * y2);
    }

    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70.0 * (n0 + n1 + n2);
  }

  /**
   * Fractional Brownian Motion (FBM)
   * Sums multiple octaves of noise for highly organic, crinkly, natural shapes.
   */
  public fbm(
    x: number,
    y: number,
    octaves: number,
    persistence = 0.5,
    lacunarity = 2.0,
  ): number {
    let total = 0;
    let frequency = 2;
    let amplitude = 4;
    let maxValue = 0;
    for (let i = 0; i < octaves; i++) {
      total += this.noise(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }
    return total / maxValue;
  }

  /**
   * Ridged Multi-Fractal Noise
   * Creates sharp, jagged mountain ridges instead of smooth rolling hills.
   */
  public ridged(
    x: number,
    y: number,
    octaves: number,
    persistence = 0.5,
    lacunarity = 2.0,
  ): number {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;
    let weight = 1.0;
    for (let i = 0; i < octaves; i++) {
      let v = 1.0 - Math.abs(this.noise(x * frequency, y * frequency));
      v = v * v;
      v *= weight;
      weight = Math.max(0.0, Math.min(1.0, v * 2.0));
      total += v * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }
    return (total / maxValue) * 2.0 - 1.0; // Normalize back to roughly -1..1
  }
}

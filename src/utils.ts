// Earth radius 6371 km => 600 radio units
export function scaleKilometers(km: number): number {
	return km * 600 / 6371;
}

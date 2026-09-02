const VEHICLE_STORAGE_KEY = 'garage-vehicles';

export function saveVehicles(vehicles) {
  localStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(vehicles));
}

export function loadVehicles() {
  const savedVehicles = localStorage.getItem(VEHICLE_STORAGE_KEY);

  if (!savedVehicles) {
    return [];
  }

  return JSON.parse(savedVehicles);
}

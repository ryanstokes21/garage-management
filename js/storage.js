const VEHICLE_KEY = 'garage-manager-vehicles';
const MAINTENANCE_KEY = 'garage-manager-maintenance';

export function saveVehicles(vehicles) {
  localStorage.setItem(VEHICLE_KEY, JSON.stringify(vehicles));
}

export function loadVehicles() {
  return JSON.parse(localStorage.getItem(VEHICLE_KEY)) || [];
}

export function saveMaintenance(records) {
  localStorage.setItem(MAINTENANCE_KEY, JSON.stringify(records));
}

export function loadMaintenance() {
  return JSON.parse(localStorage.getItem(MAINTENANCE_KEY)) || [];
}

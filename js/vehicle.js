import { loadVehicles, saveVehicles } from './storage.js';

const vehicles = loadVehicles();

class vehicle {
  constructor(type, make, model, year, trim, mileage, nickname, notes) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.make = make;
    this.model = model;
    this.year = year;
    this.trim = trim;
    this.mileage = mileage;
    this.nickname = nickname;
    this.notes = notes;
  }
}

export function addVehicleToList(
  type,
  make,
  model,
  year,
  trim,
  mileage,
  nickname,
  notes,
) {
  const newVehicle = new vehicle(
    type,
    make,
    model,
    year,
    trim,
    mileage,
    nickname,
    notes,
  );

  vehicles.push(newVehicle);

  saveVehicles(vehicles);
}

export function renderVehicleCard(content) {
  content.textContent = '';

  for (const vehicle of vehicles) {
    const card = document.createElement('div');
    card.classList.add('card');

    const vehicleType = document.createElement('p');
    vehicleType.classList.add('vehicle-type');
    vehicleType.textContent = vehicle.type;

    const vehicleNickname = document.createElement('p');
    vehicleNickname.classList.add('vehicle-nickname');
    vehicleNickname.textContent = vehicle.nickname;

    const vehicleYearMake = document.createElement('p');
    vehicleYearMake.textContent = `${vehicle.year} ${vehicle.make}`;

    const vehicleModelTrim = document.createElement('p');
    vehicleModelTrim.textContent = `${vehicle.model} ${vehicle.trim}`;

    const vehicleMileage = document.createElement('p');
    vehicleMileage.classList.add('vehicle-mileage');
    vehicleMileage.textContent = `${vehicle.mileage} miles`;

    const actionContainer = document.createElement('div');
    actionContainer.classList.add('action-container');

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('action-btn');
    detailsBtn.textContent = 'View';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';

    actionContainer.append(detailsBtn, deleteBtn);

    card.append(
      vehicleType,
      vehicleNickname,
      vehicleYearMake,
      vehicleModelTrim,
      vehicleMileage,
      actionContainer,
    );

    content.append(card);

    deleteBtn.addEventListener('click', () => {
      deleteVehicle(vehicle.id);
      renderVehicleCard(content);
    });
  }
}

function deleteVehicle(id) {
  const index = vehicles.findIndex((vehicle) => vehicle.id === id);

  if (index === -1) return;

  vehicles.splice(index, 1);

  saveVehicles(vehicles);
}

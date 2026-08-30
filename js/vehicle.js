const vehicles = [];

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
  console.log('newVehicle', newVehicle);

  vehicles.push(newVehicle);
  console.log('vehicles', vehicles);
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

    const vehicleString = document.createElement('p');
    vehicleString.classList.add('vehicle');
    vehicleString.textContent = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;

    const vehicleMileage = document.createElement('p');
    vehicleMileage.classList.add('vehicle-mileage');
    vehicleMileage.textContent = vehicle.mileage;

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('action-btn');
    detailsBtn.textContent = 'View Vehicle Details';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('black-btn');
    deleteBtn.textContent = 'Delete Vehicle';

    card.append(vehicleType, vehicleNickname, vehicleString, vehicleMileage);

    content.append(card);
  }
}

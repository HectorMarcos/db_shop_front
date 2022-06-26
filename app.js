const API_URL = "http://localhost:8080/api/customer";
let customer = [];
let deleteId = null;

window.addEventListener("DOMContentLoaded", () => {
	getCustomer();
});

const getCustomer = () => {
	fetch(API_URL)
		.then((response) => response.json())
		.catch((error) => {
			alertManager("error", "Ocurrión un problema al cargar los productos");
		})
		.then((data) => {
			renderResult(data);
		});
};

const customerList = document.querySelector("#customerList");

const renderResult = (customer) => {
	let listHTML = `<table class="table">
		<tr>
			<th>ID</th>
			<th>Nombre</th>
			<th>Apellido</th>
			<th>Fecha de nacimiento</th>
			<th>Telefono</th>
			<th>Pais</th>
			<th>Ciudad</th>
			<th>Direccion</th>
			<th>Codigo Postal</th>
		</tr>
		`;
	customer.forEach((customer) => {
		listHTML += `
		<tr>
			<td>${customer.id}</td>
			<td>${customer.name}</td>
			<td>${customer.surname}</td>
			<td>${customer.birthdate}</td>
			<td>${customer.phone}</td>
			<td>${customer.country}</td>
			<td>${customer.city}</td>
			<td>${customer.direction}</td>
			<td>${customer.postCode}</td>
			<td><button type="button" class="btn btn-primary" onclick="openModalEdit(${customer.id})">Editar</button></td>
			<td><button type="button" class="btn btn-primary" onclick="openModalConfirm(${customer.id})">Eliminar</button></td>
		</tr>
    `;
	});
	listHTML += `</table>`;
	customerList.innerHTML = listHTML;
};

const addCustomer = () => {
	const formData = new FormData(document.querySelector("#formAdd"));

	document.querySelector("#msgFormAdd").innerHTML = "";

	const customer = {
		name: formData.get("name"),
		surname: formData.get("surname"),
		birthdate: formData.get("bithdate"),
		phone: formData.get("phone"),
		country: formData.get("country"),
		city: formData.get("city"),
		direction: formData.get("direction"),
		postCode: formData.get("postCode"),
	};

	console.log(customer);

	fetch(
		`${API_URL}/add?name=${customer.name}
		&surname=${customer.surname}
		&birthdate=${customer.birthdate}
		&phone=${customer.phone}
		&country=${customer.country}
		&city=${customer.city}
		&direction=${customer.direction}
		&postCode=${customer.postCode}`,
		{
			method: "POST",
			body: JSON.stringify(customer),
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
		.then((res) => res.json())
		.catch((error) => {
			alertManager("error", error);
			document.querySelector("#formAdd").reset();
		})
		.then((response) => {
			alertManager("success", response);
			getCustomer();
		});
};

const getCustomerByID = (id) => {
	fetch(`${API_URL}/add/${id}`, {
		method: "GET",
		body: JSON.stringify(customer),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.catch((error) => {
			alertManager("error", "Ocurrión un problema al cargar los productos");
		})
		.then((data) => {
			renderResult(data);
		});

	const customerByID = {
		name: formData.get("name"),
		surname: formData.get("surname"),
		birthdate: formData.get("bithdate"),
		phone: formData.get("phone"),
		country: formData.get("country"),
		city: formData.get("city"),
		direction: formData.get("direction"),
		postCode: formData.get("postCode"),
	};

	console.log(customerByID);
};

const editCustomer = (id) => {
	let customer = {};
	getCustomerByID(id).filter((customer) => {
		if (customer.Id == id) {
			customer = customer;
		}
	});

	document.querySelector("#formEdit #id").value = customer.id;
	document.querySelector("#formEdit #name").value = customer.name;
	document.querySelector("#formEdit #surname").value = customer.surname;
	document.querySelector("#formEdit #birthdate").value = customer.birthdate;
	document.querySelector("#formEdit #phone").value = customer.phone;

	console.log(customer);
	openModalEdit();
};

const updateCustomer = () => {
	const customer = {
		Nombre: document.querySelector("#formEdit #nombre").value,
		Color: document.querySelector("#formEdit #color").value,
		Precio: document.querySelector("#formEdit #precio").value,
		Id: document.querySelector("#formEdit #ID").value,
	};

	document.querySelector("#msgFormEdit").innerHTML = "";

	fetch(API_URL, {
		method: "PUT",
		body: JSON.stringify(product),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.catch((error) => {
			alertManager("error", error);
		})
		.then((response) => {
			alertManager("success", response);
			getProducts();
		});
	document.querySelector("#formEdit").reset();
};

const deleteProduct = (deleteId) => {
	fetch(`${API_URL}/remove/${deleteId}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.catch((error) => {
			alertManager("error", error);
		})
		.then((response) => {
			alertManager("success", response);
			closeModalConfirm();
			getCustomer();
			deleteId = null;
		});
};

const confirmDelete = (res) => {
	if (res) {
		deleteProduct(deleteId);
	} else {
		closeModalConfirm();
	}
};

// MODAL ADD MANAGER
/** --------------------------------------------------------------- */
const btnAdd = document.querySelector("#btnAdd");
const modalAdd = document.querySelector("#modalAdd");

btnAdd.onclick = () => openModalAdd();

window.onclick = function (event) {
	if (event.target == modalAdd) {
		//modalAdd.style.display = "none";
	}
};

const closeModalAdd = () => {
	modalAdd.style.display = "none";
};

const openModalAdd = () => {
	modalAdd.style.display = "block";
};

// MODAL ADIT MANAGER
/** --------------------------------------------------------------- */
const modalEdit = document.querySelector("#modalEdit");

const openModalEdit = () => {
	modalEdit.style.display = "block";
};

const closeModalEdit = () => {
	modalEdit.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == modalEdit) {
		//modalEdit.style.display = "none";
	}
};

// MODAL CONFIRM MANAGER
/** --------------------------------------------------------------- */
const modalConfirm = document.getElementById("modalConfirm");

window.onclick = function (event) {
	if (event.target == modalConfirm) {
		modalConfirm.style.display = "none";
	}
};

const closeModalConfirm = () => {
	modalConfirm.style.display = "none";
};

const openModalConfirm = (id) => {
	deleteId = id;
	modalConfirm.style.display = "block";
};

/** ALERT */
const alertManager = (typeMsg, message) => {
	const alert = document.querySelector("#alert");

	alert.innerHTML = message || "Se produjo cambios";
	alert.classList.add(typeMsg);
	alert.style.display = "block";

	setTimeout(() => {
		alert.style.display = "none";
		alert.classList.remove(typeMsg);
	}, 3500);
};

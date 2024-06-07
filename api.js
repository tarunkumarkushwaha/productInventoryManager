export let newOrders = [
  {
    "customer_id": 11908,
    "items": [
      {
        "id": 246,
        "selling_price": 23,
        "max_retail_price": 21,
        "amount": 22,
        "unit": "kg",
        "quantity_in_inventory": 1,
        "name": "egg"
      }
      , {
        "id": 246,
        "selling_price": 23,
        "max_retail_price": 21,
        "amount": 22,
        "unit": "kg",
        "quantity_in_inventory": 1,
        "name": "pulse"
      }
    ],
    "totalprice": 1000,
    "paid": false,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": new Date()
  }
];

export const completedOrders = [
  {
    "customer_id": 11908,
    "items": "item 1",
    "totalprice": 1000,
    "paid": true,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": new Date()
  },
  {
    "customer_id": 11908,
    "items": "item 2",
    "totalprice": 1000,
    "paid": true,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": new Date()
  },
  {
    "customer_id": 11908,
    "items": "item 3",
    "totalprice": 1000,
    "paid": true,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": new Date()
  },
];

const customerData = [{
  "id": 9,
  "customer": 11908,
  "customer_profile": {
    "id": 11908,
    "name": "Ram",
    "color": [
      182,
      73,
      99
    ],
    "email": "jesus_christ@church.com",
    "pincode": "Mumbai",
    "location_name": "Mumbai, Maharashtra, India",
    "type": "C",
    "profile_pic": null,
    "gst": ""
  },
}]

export const Products = {
  "id": 209,
  "display_id": 8,
  "owner": 1079,
  "brand": "New Product Brand",
  "products": [
    {
      "id": 248,
      "selling_price": 54,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 0,
      "name": "wheat"
    },
    {
      "id": 247,
      "selling_price": 32,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 0,
      "name": "rice"
    },
    {
      "id": 249,
      "selling_price": 12,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 100,
      "name": "potato"
    },
    {
      "id": 246,
      "selling_price": 23,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 1,
      "name": "pulse"
    },
    {
      "id": 245,
      "selling_price": 23,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 1,
      "name": "paddy"
    }
  ],
  "updated_on": "2024-05-24T12:46:41.995873Z",
  "adding_date": "2024-05-24T12:46:41.995828Z"
}

const DATA = localStorage.getItem('data');
if (DATA) {
  newOrders = JSON.parse(DATA);
}

const USERS = localStorage.getItem('users');
if (USERS) {
  customerData = JSON.parse(USERS);
}

const validatePassword = (inputs) => {
  console.log("validate password logic",inputs)
}

const customerCreator = (inputs) => {
  let stringId = Date.now().toString()
  customerData.push(
    {
      "customer_id": stringId,
      "customer_name": inputs.name,
      "customer_password": inputs.password,
      "customer_createddate": new Date(),
    }
  )
    localStorage.setItem("users", JSON.stringify(customerData))
}

export const signUprequest = async (nameAndPassword) => {
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(nameAndPassword);
        customerCreator(nameAndPassword)
      }, 500);
  });
};
export const signInrequest = async (nameAndPassword) => {
  return new Promise((resolve, reject) => {
    if (validatePassword(nameAndPassword)) {
      setTimeout(() => {
        resolve({ signin: true });
      }, 500);
    }
    else {
      setTimeout(() => {
        reject("user not found")
      }, 500);
    }
  });
};

export const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ completedOrders: completedOrders, newOrders: newOrders, Products: Products });
    }, 500);
  });
};

export const createData = async (newEvent) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newOrders.push(newEvent);
      resolve(newEvent);
      localStorage.setItem("data", JSON.stringify(newOrders));
    }, 500);
  });
};

export const patchData = async (newEvent) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let currentorder = newEvent.currentData
      let modItems = newEvent.items
      currentorder.items = modItems
      let newarray = [...newOrders.slice(0, newOrders.indexOf(newEvent.currentData)), currentorder, ...newOrders.slice(newOrders.indexOf(newEvent.currentData) + 1)];
      newOrders = newarray
      resolve("item has been modified");
      localStorage.setItem("data", JSON.stringify(newOrders));
    }, 500);
  });
};

export const deleteData = async (newEvent) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let newarray = [...newOrders.slice(0, newOrders.indexOf(newEvent)), ...newOrders.slice(newOrders.indexOf(newEvent) + 1)];
      newOrders = newarray
      resolve("item has been deleted");
      localStorage.setItem("data", JSON.stringify(newOrders));
      // console.log(newarray,newOrders)
    }, 500);
  });
};

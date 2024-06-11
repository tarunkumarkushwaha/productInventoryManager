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
      , {
        "id": 251,
        "selling_price": 44,
        "max_retail_price": 44,
        "amount": 44,
        "unit": "kg",
        "quantity_in_inventory": 1,
        "name": "pulse"
      }
    ],
    "totalprice": 1000,
    "paid": false,
    "invoice_no": "1212121",
    "invoice_date": new Date()
  }
];

export const completedOrders = [
  {
    "customer_id": "Tarun",
    "items": "tomato 1",
    "totalprice": 1000,
    "paid": true,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": new Date()
  },
  {
    "customer_id": "Tarun",
    "items": "tomato 2",
    "totalprice": 1000,
    "paid": true,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": new Date()
  },
  {
    "customer_id": "Tarun",
    "items": "tomato 3",
    "totalprice": 1000,
    "paid": true,
    "invoice_no": "Invoice - 1212121",
    "invoice_date": new Date()
  },
];

export const Products = {
  "id": 209,
  "display_id": 8,
  "owner": 1079,
  "brand": "New Product Brand",
  "products": [
    {
      "id": 248,
      "selling_price": 32,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 100,
      "name": "wheat"
    },
    {
      "id": 247,
      "selling_price": 50,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 100,
      "name": "rice"
    },
    {
      "id": 249,
      "selling_price": 20,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 100,
      "name": "potato"
    },
    {
      "id": 246,
      "selling_price": 200,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 100,
      "name": "pulse"
    },
    {
      "id": 245,
      "selling_price": 25,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 0,
      "name": "paddy"
    },
    {
      "id": 252,
      "selling_price": 44,
      "total_price": 0,
      "amount": 0,
      "unit": "kg",
      "quantity_in_inventory": 100,
      "name": "sugar"
    }
  ],
  "updated_on": "2024-05-24T12:46:41.995873Z",
  "adding_date": "2024-05-24T12:46:41.995828Z"
}

const DATA = localStorage.getItem('data');
if (DATA) {
  newOrders = JSON.parse(DATA);
}

export const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ completedOrders: completedOrders, newOrders: newOrders, Products: Products });
    }, 500);
  });
};

export const createData = async (inputs) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newOrders.push(inputs);
      resolve(inputs);
      localStorage.setItem("data", JSON.stringify(newOrders));
    }, 500);
  });
};

export const patchData = async (inputs) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderTobeModifiedIndex = newOrders.indexOf(newOrders.find(order => order.invoice_no === inputs.currentData.invoice_no));
      let currentorder = inputs.currentData
      let modItems = inputs.items
      currentorder.items = modItems
      currentorder.totalprice = modItems.reduce((total, product) => total + product.total_price, 0)
      let newarray = [...newOrders.slice(0, orderTobeModifiedIndex), currentorder, ...newOrders.slice(orderTobeModifiedIndex + 1)];
      newOrders = newarray
      resolve("item has been modified");
      localStorage.setItem("data", JSON.stringify(newOrders));
    }, 500);
  });
};

export const deleteData = async (inputs) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderTobeDeletedIndex = newOrders.indexOf(newOrders.find(order => order.invoice_no === inputs.invoice_no));
      let newarray = [...newOrders.slice(0, orderTobeDeletedIndex), ...newOrders.slice((orderTobeDeletedIndex + 1))];
      // console.log(inputs,newOrders)
      localStorage.setItem("data", JSON.stringify(newOrders));
      newOrders = newarray
      resolve("order has been deleted");
    }, 500);
  });
};

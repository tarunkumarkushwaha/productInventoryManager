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

const DATA = localStorage.getItem('data');
if (DATA) {
  newOrders = JSON.parse(DATA);
}

// console.log(newOrders, "new orders")

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

const customerData = {
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
}

export const Products = {
  "id": 209,
  "display_id": 8,
  "owner": 1079,
  "brand": "New Product Brand",
  "products": [
    {
      "id": 248,
      "selling_price": 54,
      "max_retail_price": 44,
      "amount": 33,
      "unit": "kg",
      "quantity_in_inventory": 0,
      "name": "wheat"
    },
    {
      "id": 247,
      "selling_price": 32,
      "max_retail_price": 32,
      "amount": 33,
      "unit": "kg",
      "quantity_in_inventory": 0,
      "name": "rice"
    },
    {
      "id": 246,
      "selling_price": 23,
      "max_retail_price": 21,
      "amount": 22,
      "unit": "kg",
      "quantity_in_inventory": 1,
      "name": "pulse"
    },
    {
      "id": 245,
      "selling_price": 23,
      "max_retail_price": 21,
      "amount": 22,
      "unit": "kg",
      "quantity_in_inventory": 1,
      "name": "paddy"
    }
  ],
  "updated_on": "2024-05-24T12:46:41.995873Z",
  "adding_date": "2024-05-24T12:46:41.995828Z"
}

export const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ completedOrders: completedOrders, newOrders: newOrders });
    }, 500);
  });
};

export const createData = async (newEvent) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newOrders.push(newEvent);
      resolve(newEvent);
      localStorage.setItem("data", JSON.stringify(newOrders));
      // console.log(newOrders)
    }, 500);
  });
};
